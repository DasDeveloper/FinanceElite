const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");
const { categoriesPlanLimiter } =  require("../middleware/categoryPlanLimiter");

router.post('/getAllCategory', categoryController.getAllCategories)
router.post('/addNewCategory', categoriesPlanLimiter, categoryController.addNewCategory)
router.post('/delete', categoryController.deleteCategory)

module.exports = router;