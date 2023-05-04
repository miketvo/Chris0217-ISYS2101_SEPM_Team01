const express = require("express");
const router = express.Router();
const popupController = require("../controllers/popupController");

router.post("/", popupController.handleNewInput);

module.exports = router;
