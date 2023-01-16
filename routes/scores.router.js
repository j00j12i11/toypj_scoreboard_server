const express = require("express");
const router = express.Router();

const scoresController = require("../controller/scores.controller");

router.get("/", scoresController.getAll);
router.get("/score", scoresController.getByElement);
router.get("/:id", scoresController.getById);

// router.post("/", scoresController.create);
router.post("/", scoresController.create, scoresController.update_u1, scoresController.update_u2, scoresController.update_g);

router.put("/:id", scoresController.update);

module.exports = router;