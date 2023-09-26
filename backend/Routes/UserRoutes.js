const express = require("express");

const UserController = require("../Controller/UsersController");

const router = express.Router();

router.get("/user/:id", UserController.getUserById);
router.put("/user/:id", UserController.updateUserById);
router.delete("/user/:id", UserController.deleteUserById);

module.exports = router;
