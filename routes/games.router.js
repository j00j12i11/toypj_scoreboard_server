const express = require("express");
const router = express.Router();

const gamesController = require("../controller/games.controller");

router.get("/", gamesController.getAll);
router.get("/game", gamesController.getByElement);
router.get("/:id", gamesController.getById);
router.post("/", gamesController.create);
router.put("/:id", gamesController.update);
router.patch("/:id", gamesController.update1);

router.use(function (err, req, res, next) {
  console.log(err.message);
  //   console.error(err.stack);
  res.json({
    status: 400,
    msg: err.message,
  });
});

module.exports = router;
