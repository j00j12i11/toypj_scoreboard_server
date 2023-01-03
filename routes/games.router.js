const express = require("express");
const router = express.Router();

const gamesController = require("../controller/games.controller");

router.get("/", gamesController.getAll);
router.get("/:id", gamesController.getById);
router.post("/", gamesController.create);
router.put("/:id", gamesController.update);

module.exports = router;