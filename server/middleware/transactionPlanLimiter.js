const User = require('../model/userModel');
const Transaction = require('../model/transactionModel');
const planHelper = require('../helper/planHelper')

const transactionPlanLimiter = async (req, res, next) =>{

    const plans = planHelper.getTransactionsLimitForRequests();

    const {userID} = req.body;

    if(!userID) return res.json({message:'UserID not found.', status: 400})

    const user = await User.findOne({_id: userID});
    const userPlan = user.plan;
    
    const transactions = await Transaction.find({userID:userID});

    const numberOfTransactions = transactions.length;

    if(numberOfTransactions >= plans.get(userPlan)) return res.json({message: `You've reached the limit on the number of transactions you can add. Please upgrade to another plan for more access.`, status:403})

    next()
}

module.exports = {
    transactionPlanLimiter
}