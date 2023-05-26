const express = require("express");
const router = express.Router();
const userhistoryController = require("../controllers/userhistoryController.js");

router.get("/", userhistoryController.handleUserHistory);

module.exports = router;