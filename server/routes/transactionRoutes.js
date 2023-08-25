const express = require("express");
const router = express.Router();
const transactionController = require("../controllers/transactionController");

router.post('/getAllTransactions', transactionController.getAllTransactions)
router.post('/getAllTransactionsLatestTwoWeeks', transactionController.getAllTransactionsLatestTwoWeeks)
router.post('/getAllCompaniesLatestTwoWeeks', transactionController.getAllCompaniesLatestTwoWeeks)
router.post('/getAllCategoriesLatestTwoWeeks', transactionController.getAllCategoriesLatestTwoWeeks)
router.post('/getAllSpendingCustomDays', transactionController.getAllSpendingCustomDays)
router.post('/getAllRevenueCustomDays', transactionController.getAllRevenueCustomDays);
router.post('/getAllCompaniesCustomDays', transactionController.getAllCompaniesCustomDays);
router.post('/getAllCategoriesCustomDays', transactionController.getAllCategoriesCustomDays);
router.post('/addNewTransaction', transactionController.addNewTransaction)
router.post('/delete', transactionController.deleteTransaction)



module.exports = router;