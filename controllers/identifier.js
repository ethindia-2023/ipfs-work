const IdentifierModel = require("../models/identifier");
const dataIndexingModel = require("../models/data-indexing");
const ActiveVisitorsModel = require("../models/active-visitors");

exports.createNewProject = async (req, res, next) => {
  try {
    console.log(req.body);
    const identifier = new IdentifierModel(
      req.body.AuthToken,
      [],
      req.body.AppID
    );
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

// for cron job to delete old logs and store uid linked with timeline
exports.deleteOldLogsOfActiveVisitors = async () => {
  try {
    const activeVisitors = new ActiveVisitorsModel();
    activeVisitors.model
      .deleteMany({})
      .then((result) => {
        console.log(`Deleted ${result.deletedCount} documents`);
      })
      .catch((error) => {
        console.error("Error while deleting documents:", error);
      });
  } catch (error) {
    console.log(error);
    return error;
  }
};

exports.deleteOldLogsOfDataIndexing = async () => {
  try {
    const dataIndexing = new dataIndexingModel();
    dataIndexing.model
      .deleteMany({})
      .then((result) => {
        console.log(`Deleted ${result.deletedCount} documents`);
      })
      .catch((error) => {
        console.error("Error while deleting documents:", error);
      });
  } catch (error) {
    console.log(error);
    return error;
  }
};

exports.pushCIDToIdentifier = async (CID, AppID) => {
  try {
    const identifier = new IdentifierModel(null, [], AppID);
    const result = await identifier.addLog(CID);
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
};

exports.findProjectAuthTokenByAppID = async (req, res, next) => {
  try {
    const identifier = new IdentifierModel(null, [], req.body.AppID);
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

exports.AddLogtoLogs = async (req, res, next) => {
  try {
    const identifier = new IdentifierModel(null, [], req.body.AppID);
    const result = await identifier.addLog(req.body.logtopush);
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

exports.findLogWithinAtomicTimeRange = async (req, res, next) => {
  try {
    const identifier = new IdentifierModel(null, [], req.body.AppID);
    const result = await identifier.findLogWithinAtomicTimeRange(
      req.body.start,
      req.body.end
    );
    res.status(200).json({
      message: "Log fetched successfully",
      result: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Log not fetched",
      error: error,
    });
  }
};

exports.findLogsByGroupedTimeRange = async (req, res, next) => {
  try {
    const identifier = new IdentifierModel(null, [], req.body.AppID);
    const result = await identifier.findLogsByGroupedTimeRange(
      req.body.start,
      req.body.end,
      req.body.intervalInSeconds
    );
    res.status(200).json({
      message: "Log fetched successfully",
      result: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Log not fetched",
      error: error,
    });
  }
};
