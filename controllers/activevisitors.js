const { ActiveVisitorsModel } = require("../models/activevisitors");

exports.postActiveVisitors = async (req, res, next) => {
  try {
    const activeVisitors = new ActiveVisitorsModel(req.body.page);
    const result = await activeVisitors.save();
    res.status(200).json({
      message: "ActiveVisitors saved successfully",
      result: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "ActiveVisitors not saved",
      error: error,
    });
  }
};

exports.addPublicKey = async (req, res, next) => {
  try {
    const activeVisitors = new ActiveVisitorsModel(req.body.page);
    const result = await activeVisitors.addPublicKey(req.body.publicKey);
    res.status(200).json({
      message: "PublicKey added successfully",
      result: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "PublicKey not added",
      error: error,
    });
  }
};

exports.getActiveVisitorsOverTimeRange = async (req, res, next) => {
  try {
    const activeVisitors = new ActiveVisitorsModel(req.body.page);
    const result = await activeVisitors.findActivePageViewsOverTimeRange(
      req.body.start,
      req.body.end
    );
    res.status(200).json({
      message: "ActiveVisitors fetched successfully",
      result: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "ActiveVisitors not fetched",
      error: error,
    });
  }
};

exports.getActiveVisitorsGroupedByTimeRange = async (req, res, next) => {
  try {
    const activeVisitors = new ActiveVisitorsModel(req.body.page);
    const result = await activeVisitors.findActivePageViewsGroupedByTimeRange(
      req.body.start,
      req.body.end,
      req.body.intervalInSeconds
    );
    res.status(200).json({
      message: "ActiveVisitors fetched successfully",
      result: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "ActiveVisitors not fetched",
      error: error,
    });
  }
};

exports.getActivePageViewsOverTimeRange = async (req, res, next) => {
  try {
    const activeVisitors = new ActiveVisitorsModel(req.body.page);
    const result = await activeVisitors.findActivePageViewsOverTimeRange(
      req.body.start,
      req.body.end
    );
    res.status(200).json({
      message: "ActivePageViews fetched successfully",
      result: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "ActivePageViews not fetched",
      error: error,
    });
  }
};
