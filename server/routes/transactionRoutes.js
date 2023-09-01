const express = require("express");
const router = express.Router();
const transactionController = require("../controllers/transactionController");
const {transactionPlanLimiter} = require('../middleware/transactionPlanLimiter')
const {limitCustomDaysRequest} = require('../middleware/customDaysRequestLimiter')

router.post('/getAllTransactions', transactionController.getAllTransactions)
router.post('/getAllTransactionsLatestTwoWeeks', transactionController.getAllTransactionsLatestTwoWeeks)
router.post('/getAllCompaniesLatestTwoWeeks', transactionController.getAllCompaniesLatestTwoWeeks)
router.post('/getAllCategoriesLatestTwoWeeks', transactionController.getAllCategoriesLatestTwoWeeks)
router.post('/getAllSpendingCustomDays', limitCustomDaysRequest, transactionController.getAllSpendingCustomDays)
router.post('/getAllRevenueCustomDays', limitCustomDaysRequest, transactionController.getAllRevenueCustomDays);
router.post('/getAllCompaniesCustomDays', limitCustomDaysRequest,transactionController.getAllCompaniesCustomDays);
router.post('/getAllCategoriesCustomDays', limitCustomDaysRequest, transactionController.getAllCategoriesCustomDays);
router.post('/addNewTransaction', transactionPlanLimiter, transactionController.addNewTransaction)
router.post('/delete', transactionController.deleteTransaction)



module.exports = router;