const express = require("express");
const router = express.Router();

const scoresController = require("../controller/scores.controller");

router.get("/", scoresController.getAll);
router.get("/score", scoresController.getByElement);
router.get("/:id", scoresController.getById);

router.post("/", scoresController.create);

// router.put("/:id", scoresController.update);

module.exports = router;