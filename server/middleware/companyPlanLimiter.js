const User = require('../model/userModel');
const Company = require('../model/companyModel');
const planHelper = require('../helper/planHelper')

const companiesPlanLimiter = async (req, res, next) =>{

    const plans = planHelper.getCompaniesLimitForRequests();

    const {userID} = req.body;

    if(!userID) return res.json({message:'UserID not found.', status: 400})

    const user = await User.findOne({_id: userID});
    const userPlan = user.plan;
    
    const companies = await Company.find({userID:userID});

    const numberOfCompanies = companies.length;

    if(numberOfCompanies >= plans.get(userPlan)) return res.json({message: `You've reached the limit on the number of companies you can add. Please upgrade to another plan for more access.`, status:403})

    next()
}

module.exports = {
    companiesPlanLimiter
}