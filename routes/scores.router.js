const express = require("express");
const router = express.Router();

const scoresController = require("../controller/scores.controller");
const check = require("../controller/check");

router.get("/", scoresController.getAll);
// router.post("/", check.scoreGameId, check.scoreUserId, scoresController.create);
router.post("/", check.scoreGameId, check.scoreUserId, scoresController.create);

module.exports = router;