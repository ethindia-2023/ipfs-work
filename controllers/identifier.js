const { IdentifierModel } = require("../models/identifier");

exports.getIdentifier = async (req, res, next) => {
  try {
    const identifier = new IdentifierModel(req.body.AuthToken);
    const result = await identifier.find();
    res.status(200).json({
      message: "Identifier fetched successfully",
      result: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Identifier not fetched",
      error: error,
    });
  }
};

exports.postIdentifier = async (req, res, next) => {
  try {
    const identifier = new IdentifierModel(req.body.AuthToken);
    const result = await identifier.save();
    res.status(200).json({
      message: "Identifier saved successfully",
      result: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Identifier not saved",
      error: error,
    });
  }
};

exports.postLog = async (req, res, next) => {
  try {
    const identifier = new IdentifierModel(req.body.AuthToken);
    const result = await identifier.addLog(req.body.Logs);
    res.status(200).json({
      message: "Log added successfully",
      result: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Log not added",
      error: error,
    });
  }
};

exports.getLogsWithinAtomicTimeRange = async (req, res, next) => {
  try {
    const identifier = new IdentifierModel(req.body.AuthToken);
    const result = await identifier.findLogWithinAtomicTimeRange(
      req.body.start,
      req.body.end
    );
    res.status(200).json({
      message: "Logs fetched successfully",
      result: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Logs not fetched",
      error: error,
    });
  }
};

exports.getLogsByGroupTimeRange = async (req, res, next) => {
  try {
    const identifier = new IdentifierModel(req.body.AuthToken);
    const result = await identifier.findLogsGroupedByTimeRange(
      req.body.start,
      req.body.end,
      req.body.intervalInSeconds
    );
    res.status(200).json({
      message: "Logs fetched successfully",
      result: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Logs not fetched",
      error: error,
    });
  }
};
