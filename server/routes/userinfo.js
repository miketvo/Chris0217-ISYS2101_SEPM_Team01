const express = require("express");
const router = express.Router();
const userInfoController = require("../controllers/userInfoController.js");

router.get("/", userInfoController.handleUserInput);

module.exports = router;