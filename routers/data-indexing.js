const { Router } = require("express");

const controller = require("../controllers/data-indexing.js");

const router = Router();

router.post("/data-indexing", controller.addSinglePageToPages);
router.post("/page-by-time-range", controller.getPageByTimeRange);
router.post(
  "/find-page-by-group-time-range",
  controller.findPagesByGroupTimeRange
);

module.exports = router;
