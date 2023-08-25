const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const {loginLimiter} = require('../middleware/loginLimiter')

router.post('/', loginLimiter, authController.login)

router.get('/session', authController.getSession)

router.post('/logout', authController.logout)


module.exports = router;