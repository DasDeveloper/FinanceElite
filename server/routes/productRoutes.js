const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");


router.get('/all', productController.getAllProducts);
router.post('/getProductByProductID', productController.getProductByProductID)
router.post('/getProductByProductName', productController.getProductByProductName)
router.post('/addNewProduct', productController.addNewProduct);

module.exports = router;