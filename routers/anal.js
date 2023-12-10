const { Router } = require("express");
const controller = require("../controllers/anal");

const router = Router();

router.get("/", controller.fetch24hVolume);
router.post("/", controller.feed24hVolume);

module.exports = router;

