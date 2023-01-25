const express = require("express");
const router = express.Router();

const scoresController = require("../controller/scores.controller");

router.get("/", scoresController.getAll);
router.get("/score", scoresController.getByElement);
router.get("/:id", scoresController.getById);
router.post("/", scoresController.create);
router.put("/:id", scoresController.update);
router.patch("/:id", scoresController.update);

router.use(function (err, req, res, next) {
    console.log(err.message);
//   console.error(err.stack);
  res.json({
    status : 400,
    msg : err.message
  })
});

module.exports = router;
