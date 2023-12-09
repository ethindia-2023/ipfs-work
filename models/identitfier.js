const mongoose = require("mongoose");
const identifierSchema = require("../schema/identifier");

class IdentifierModel {
  constructor(AuthToken = none, Logs = []) {
    this.model = mongoose.model("Identifier", identifierSchema);
    this.AuthToken = AuthToken;
    this.Logs = Logs;
  }

  async save() {
    try {
      const result = await this.model.create({
        AuthToken: this.AuthToken,
        Logs: this.Logs,
      });
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  // idts use aayega
  async find() {
    try {
      const result = await this.model
        .findOne({ AuthToken: this.AuthToken })
        .select({ Logs: 1 })
        .lean();
      const logs = result ? result.Logs : [];

      const logsFormatted = logs.map((log) => ({
        timestamp: log.createdAt,
      }));

      return logsFormatted;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async addLog(logtopush) {
    try {
      const result = await this.model.updateOne(
        { AuthToken: this.AuthToken },
        { $push: { Logs: logtopush } }
      );
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async findLogWithinAtomicTimeRange(start, end) {
    try {
      const result = await this.model
        .find({
          AuthToken: this.AuthToken,
          createdAt: { $gte: start, $lte: end },
        })
        .select({ Logs: 1, createdAt: 1 })
        .lean();
      const logs = result.map(({ Logs, createdAt }) => ({
        Logs,
        timestamp: createdAt,
      }));
      return logs;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async findLogsByGroupTimeRange(start, end, intervalInSeconds) {
    try {
      const result = await this.model
        .aggregate([
          {
            $match: {
              AuthToken: this.AuthToken,
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
              Logs: { $push: "$Logs" },
            },
          },
        ])
        .sort({ _id: 1 })
        .exec();
      const logs = result.map(({ Logs, _id }) => ({
        Logs,
        timestamp: _id,
      }));
      return logs;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

module.exports = IdentifierModel;
