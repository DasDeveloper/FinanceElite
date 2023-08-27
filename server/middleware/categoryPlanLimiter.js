const User = require('../model/userModel');
const Category = require('../model/categoryModel');
const planHelper = require('../helper/planHelper')

const categoriesPlanLimiter = async (req, res, next) =>{

    const plans = planHelper.getCategoriesLimitForRequests()

    const {userID} = req.body;

    if(!userID) return res.json({message:'UserID not found.', status: 400})

    const user = await User.findOne({_id: userID});
    const userPlan = user.plan;
    
    const categories = await Category.find({userID:userID});

    const numberOfCategories = categories.length;

    if(numberOfCategories >= plans.get(userPlan)) return res.json({message: `You've reached the limit on the number of categories you can add. Please upgrade to another plan for more access.`, status:403})

    next()
}

module.exports = {
    categoriesPlanLimiter
}