const express = require("express");
const router = express.Router();
const fetchController = require("../controllers/fetchController");

router.get("/", fetchController.getAllController);
router.get("/label", fetchController.getLabelController);
router.get("/calories", fetchController.getCaloriesController);
router.get("/diet", fetchController.getDietLabelsController);
router.get("/allIngredients", fetchController.getAllIngredientsController)

module.exports = router;
