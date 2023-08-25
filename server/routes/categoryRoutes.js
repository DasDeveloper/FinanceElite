const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");

router.post('/getAllCategory', categoryController.getAllCategories)
router.post('/addNewCategory', categoryController.addNewCategory)
router.post('/delete', categoryController.deleteCategory)

module.exports = router;