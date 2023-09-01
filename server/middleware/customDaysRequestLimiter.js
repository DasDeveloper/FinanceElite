const {rateLimit} = require('express-rate-limit')

const limitCustomDaysRequest = rateLimit({
	windowMs: 15 * 60 * 1000, 
	max: 50, 
	standardHeaders: 'draft-7', 
	legacyHeaders: false, 

})

module.exports = {
    limitCustomDaysRequest
}