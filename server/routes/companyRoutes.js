const express = require("express");
const router = express.Router();
const companyController = require("../controllers/companyController");

router.post('/getAllCompany', companyController.getAllCompanies)
router.post('/addNewCompany', companyController.addNewCompany)
router.post('/delete', companyController.deleteCompany)

module.exports = router;