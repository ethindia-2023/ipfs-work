const TxModel = require("../models/tx");

// fetch24hvoule grouped which contains the sum of all the transaction values, sum of all gasprice grouped for 24 hours
exports.fetch24hVolume = async (req, res, next) => {
    try {
        const tx = new TxModel();
        const result = await tx.getSumForLast24Hours();
        res.status(200).json({
            message: "24h volume fetched successfully",
            result: result,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "24h volume not fetched",
            error: error,
        });
    }
};

exports.feed24hVolume = async (req, res, next) => {
  try {
    const tx = new TxModel(
      req.body.AppID,
      req.body.blockNumber,
      req.body.from,
      req.body.gas,
      req.body.gasPrice,
      req.body.hash,
      req.body.input,
      req.body.to,
      req.body.value,
      req.body.transactionIndex,
      req.body.logs,
      req.body.logsBloom,
      req.body.chainId,
      req.body.timestamp
    );
    const result = await tx.save();
    res.status(200).json({
      message: "24h volume added successfully",
      result: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "24h volume not added",
      error: error,
    });
  }
};

/* dummy data for testing
{
    "AppID": "0x123",
    "blockNumber": "123",
    "from": "0x123",
    "gas": "123",
    "gasPrice": "123",
    "hash": "0x123",
    "input": "0x123",
    "to": "0x123",
    "value": "123",
    "transactionIndex": "123",
    "logs": "0x123",
    "logsBloom": "0x123",
    "chainId": "123",
    "timestamp": "123"
}

// some random data but realistic ones, like differing hashes, timestamps, gasprice, value, etc
{

}
*/
