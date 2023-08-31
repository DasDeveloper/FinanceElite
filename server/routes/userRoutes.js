const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { signupLimiter } = require("../middleware/signupLimiter");

router.post('/newUser', signupLimiter, userController.createNewUser);
router.post('/upgradeUserPurchase', userController.upgradeUserPurchase);
router.post('/getUserPlan', userController.getUserPlan)



module.exports = router;