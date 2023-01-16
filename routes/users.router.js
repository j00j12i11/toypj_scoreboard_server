const express = require("express");
const usersController = require("../controller/users.controller");
const router = express.Router();

router.get("/", usersController.getAll);
router.get("/user", usersController.getByElement);
router.get("/:id", usersController.getById);
router.post("/", usersController.create);
router.put("/:id", usersController.update);
router.patch("/:id", usersController.update1);

module.exports = router;