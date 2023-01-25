const express = require("express");
const usersController = require("../controller/users.controller");
const router = express.Router();

router.get("/", usersController.getAll);
router.get("/user", usersController.getByElement);
router.get("/:id", usersController.getById);
router.post("/", usersController.create);
router.put("/:id", usersController.update);
router.patch("/:id", usersController.update1);

router.use(function (err, req, res, next) {
  console.log(err.message);
  //   console.error(err.stack);
  res.json({
    status: 400,
    msg: err.message,
  });
});

module.exports = router;
