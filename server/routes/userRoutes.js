const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { signupLimiter } = require("../middleware/signupLimiter");

router.post('/newUser', signupLimiter, userController.createNewUser);



module.exports = router;