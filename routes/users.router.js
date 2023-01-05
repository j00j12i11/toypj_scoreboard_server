const express = require("express");
const router = express.Router();

const usersController = require("../controller/users.controller");

router.get("/", usersController.getAll);
// ':id', ':name' 중 하나 선택 -> front와 논의
router.get("/:id", usersController.getById);
// router.get("/:name", usersController.getByName);
router.post("/", usersController.create);
router.put("/:id", usersController.update);

module.exports = router;