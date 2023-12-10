const mongoose = require("mongoose");
const TxSchema = require("../schema/tx");

class TxModel {
  constructor(
    AppID = null,
    blockNumber = null,
    from = null,
    gas = null,
    gasPrice = null,
    hash = null,
    input = null,
    to = null,
    value = null,
    transactionIndex = null,
    logs = null,
    logsBloom = null,
    chainId = null,
    timestamp = null
  ) {
    this.db = mongoose.connection;
    this.model = this.db.model("Tx", TxSchema);
    this.AppID = AppID;
    this.blockNumber = blockNumber;
    this.from = from;
    this.gas = gas;
    this.gasPrice = gasPrice;
    this.hash = hash;
    this.input = input;
    this.to = to;
    this.value = value;
    this.transactionIndex = transactionIndex;
    this.logs = logs;
    this.logsBloom = logsBloom;
    this.chainId = chainId;
    this.timestamp = timestamp;
  }

  async getSumForLast24Hours() {
    try {
      const pipeline = [
        {
          $match: {
            createdAt: {
              $gte: new Date(new Date() - 24 * 60 * 60 * 1000),
            },
          },
        },
        {
          $group: {
            _id: null,
            totalValue: { $sum: { $toDouble: "$value" } },
            totalGasPrice: { $sum: { $toDouble: "$gasPrice" } },
          },
        },
      ];

      const result = await this.model.aggregate(pipeline);
      const formattedResult = {
        total: result[0].totalValue,
        totalGas: result[0].totalGasPrice,
      };
      return formattedResult;
    } catch (error) {
      console.error(error);
    }
  }
  
  async save() {
    try {
      const result = await this.model.create({
        AppID: this.AppID,
        blockNumber: this.blockNumber,
        from: this.from,
        gas: this.gas,
        gasPrice: this.gasPrice,
        hash: this.hash,
        input: this.input,
        to: this.to,
        value: this.value,
        transactionIndex: this.transactionIndex,
        logs: this.logs,
        logsBloom: this.logsBloom,
        chainId: this.chainId,
        timestamp: this.timestamp,
      });
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

module.exports = TxModel;
