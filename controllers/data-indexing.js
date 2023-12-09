const DataIndexingModel = require("../models/data-indexing");

// not native
exports.addSinglePageToPages = async (req, res, next) => {
  try {
    const dataIndexing = new DataIndexingModel(
      req.body.page,
      req.body.AppID
    )
    const result = await dataIndexing.addPage();
    res.status(200).json({
      message: "Page added successfully",
      result: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Page not added",
      error: error,
    });
  }
};

exports.getPageByTimeRange = async (req, res, next) => {
  try {
    const dataIndexing = new DataIndexingModel(none, req.body.AppID);
    const result = await dataIndexing.find_page_by_time_range(
      req.body.start,
      req.body.end
    );
    res.status(200).json({
      message: "Page fetched successfully",
      result: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Page not fetched",
      error: error,
    });
  }
};

exports.findPagesByGroupTimeRange = async (req, res, next) => {
  try {
    const dataIndexing = new DataIndexingModel(none, req.body.AppID);
    const result = await dataIndexing.findPagesByGroupTimeRange(
      req.body.start,
      req.body.end,
      req.body.intervalInSeconds
    );
    res.status(200).json({
      message: "Pages fetched successfully",
      result: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Pages not fetched",
      error: error,
    });
  }
};
