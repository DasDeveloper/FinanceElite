const express = require("express");
const router = express.Router();
const companyController = require("../controllers/companyController");
const {companiesPlanLimiter} = require('../middleware/companyPlanLimiter')

router.post('/getAllCompany', companyController.getAllCompanies)
router.post('/addNewCompany',companiesPlanLimiter, companyController.addNewCompany)
router.post('/delete', companyController.deleteCompany)

module.exports = router;