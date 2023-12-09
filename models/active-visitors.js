const mongoose = require("mongoose");
const activeVisitorsScheme = require("../schema/activevisitors");

class ActiveVisitorsModel {
  constructor(publicKeys = [], page = none) {
    this.model = mongoose.model("activepageviews", activeVisitorsScheme);
    this.page = page;
    this.publicKeys = publicKeys;
  }
  async save() {
    try {
      const result = await this.model.create({
        page: this.page,
        publicKeys: this.publicKeys,
      });
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async addPublicKey(publicKey) {
    try {
      const result = await this.model.updateOne(
        { page: this.page },
        { $push: { publicKeys: publicKey } }
      );
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async findActivePageViewsOverTimeRange(start, end) {
    try {
      const result = await this.model
        .find({
          page: this.page,
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