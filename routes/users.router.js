const express = require("express");
const gamesController = require("../controller/games.controller");
const router = express.Router();

const usersController = require("../controller/users.controller");

router.get("/", usersController.getAll);
router.get("/user", usersController.getByElement);
router.get("/:id", gamesController.getById);
router.post("/", usersController.create);
router.put("/:id", usersController.update);
router.patch("/:id", usersController.update1);

module.exports = router;