const { Router } = require("express");

const controller = require("../controllers/identifier.js");

const router = Router();

router.post("/createidentifier", controller.createNewProject);
router.post("/get-identifier", controller.findProjectAuthTokenByAppID);
router.post("/log", controller.AddLogtoLogs);
router.post("/logatomic", controller.findLogWithinAtomicTimeRange);
router.post("/loggrouped", controller.findLogsByGroupedTimeRange);

module.exports = router;
