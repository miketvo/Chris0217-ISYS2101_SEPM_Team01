const express = require("express");
const router = express.Router();
const fetchController = require("../controllers/fetchController");

router.get("/", fetchController.getAllController);
router.get("/allIngredients", fetchController.getAllIngredientsController)

module.exports = router;