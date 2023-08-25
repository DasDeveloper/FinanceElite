const limiter = require('express-rate-limit');


const signupLimiter = limiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
	max: 5, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // 
})

module.exports = {
    signupLimiter
}