const express = require("express");

const AuthController = require("../Controller/AuthController");

const router = express.Router();

router.post("/signup", AuthController.signUp);
router.post("/login", AuthController.login);

module.exports = router;
