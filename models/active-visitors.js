const mongoose = require("mongoose");
const activeVisitorsScheme = require("../schema/activevisitors");
const database = require("../utils/db");
const dataindexingModel = require("./data-indexing");
class ActiveVisitorsModel {
  constructor(publicKey = null, page = null, AppID = null) {
    this.db = database.db;
    this.model = this.db.mongoose.model(
      "activepageviews",
      activeVisitorsScheme
    );
    this.page = page;
    this.publicKey = publicKey;
    this.AppID = AppID;
  }

  // checks if a page is already been visited and if it has already been visited then it updates the public keys array otherwise it creates a new entry and saves it
  async savePageView() {
    try {
      const result = await this.model.findOneAndUpdate(
        { page: this.page, AppID: this.AppID },
        {
          $addToSet: { publicKeys: { key: this.publicKey } },
        },
        { upsert: true, new: true }
      );
      const dataIndexing = new dataindexingModel(result, this.AppID);
      const response = await dataIndexing.addPage();
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async findActivePageViewsOverTimeRange(start, end) {
    try {
      const result = await this.model
        .find({
          page: this.page,
          AppID: this.AppID,
          createdAt: { $gte: start, $lte: end },
        })
        .select({ publicKeys: 1, createdAt: 1 })
        .lean();
      const activeVisitors = result.map(({ publicKeys, createdAt }) => ({
        publicKeys,
        timestamp: createdAt,
      }));

      return activeVisitors;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async findActivePageViewsGroupedByTimeRange(start, end, intervalInSeconds) {
    try {
      const result = await this.model
        .aggregate([
          {
            $match: {
              page: this.page,
              AppID: this.AppID,
              createdAt: { $gte: start, $lte: end },
            },
          },
          {
            $group: {
              _id: {
                $toDate: {
                  $subtract: [
                    { $toLong: "$createdAt" },
                    {
                      $mod: [
                        { $toLong: "$createdAt" },
                        1000 * intervalInSeconds,
                      ],
                    },
                  ],
                },
              },
              publicKeys: { $push: "$publicKeys" },
            },
          },
        ])
        .sort({ _id: 1 })
        .exec();

      const activeVisitors = result.map(({ publicKeys, _id }) => ({
        publicKeys,
        timestamp: _id,
      }));

      return activeVisitors;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

module.exports = ActiveVisitorsModel;
