const Transaction = require('../model/transactionModel')
const transactionHelper = require('../helper/transactionHelperFunctions')




const getAllTransactions = async (req, res) =>{

    const {userID} = req.body;
    
    if(!userID) return res.json({message:'UserID not found.', status: 400})

    const transactions = await Transaction.find({userID:userID});

    const newFormatedTransactions = [];

    transactions.map(object =>{
                newFormatedTransactions.push({id: object.id, category:object.category, company:object.company, date:object.date, amount:object.amount, paymentType:object.paymentType, type:object.type})
            })

    return res.status(200).json(newFormatedTransactions);
    
}


const addNewTransaction = async (req, res) =>{

    const {userID, category, company, type, paymentType, amount, date} = req.body;

    if(!type  || !amount || !date) return res.json({message: "Field missing", status:422})

    if(!userID) return res.json({message:'UserID not found.', status: 400});

    const transaction = await Transaction.create({userID:userID, category:category, company:company, type:type, paymentType:paymentType, amount:amount, date:date});


    return res.json({message: 'Successfully added a new transaction', status:201})

}

const deleteTransaction = async (req, res) =>{

    const {transactionID} = req.body;

    if(!transactionID) return res.json({message: "Transaction ID missing.", status: 422})

    const transaction = await Transaction.findById(transactionID);
    if(!transaction) return res.json({message: 'Transaction not found in the database, contact administrator', status:404})

    await transaction.deleteOne();
    
    return res.json({message: "Successfully deleted the transaction.", status:200});

}

const getAllTransactionsLatestTwoWeeks = async (req, res) =>{


    const {userID} = req.body;

    if(!userID) return res.json({message: 'userID not found', status:400});

    const latestRevenueTransactionsFormated = await transactionHelper.getFormatedDataForGraph(14, 'Revenue', userID) //Returns an array of JSON Objects [{'x':String, 'y': Number}, ..., {'x':String, 'y': Number}]
    const latestSpendingTransactionsFormated = await transactionHelper.getFormatedDataForGraph(14, 'Spending', userID)
    
    res.json({message: "Data found.", value:{spendingData: latestSpendingTransactionsFormated, revenueData: latestRevenueTransactionsFormated}, status:200})
}

const getAllCompaniesLatestTwoWeeks = async (req, res) =>{

    const {userID} = req.body;

    if(!userID) return res.json({message: 'userID not found', status:400});

    const latestCompaniesTransactionFormatted = await transactionHelper.getAllCompaniesFormatedDataForGraph(14, userID)

    res.json({message: "Data found.", value:latestCompaniesTransactionFormatted, status:200})

}

const getAllCategoriesLatestTwoWeeks = async (req, res) =>{

    const {userID} = req.body;

    if(!userID) return res.json({message: 'userID not found', status:400});

    const latestCompaniesTransactionFormatted = await transactionHelper.getAllCategoriesFormatedDataForGraph(14, userID)

    res.json({message: "Data found.", value:latestCompaniesTransactionFormatted, status:200})

}

const getAllSpendingCustomDays = async (req,res) =>{

    const {userID, daysNumber} = req.body;
    
    if(!userID) return res.json({message: 'userID not found', status:400});

    const latestSpendingTransactionsFormated = await transactionHelper.getFormatedDataForGraph(daysNumber, 'Spending', userID)

    res.json({message: "Data found.", value:latestSpendingTransactionsFormated, status:200})


}

const getAllRevenueCustomDays = async (req, res) =>{

    const {userID, daysNumber} = req.body;
    
    if(!userID) return res.json({message: 'userID not found', status:400});

    const latestRevenueTransactionsFormated = await transactionHelper.getFormatedDataForGraph(daysNumber, 'Revenue', userID)

    res.json({message: "Data found.", value:latestRevenueTransactionsFormated, status:200})


}


const getAllCompaniesCustomDays = async (req, res) =>{

    const {userID, daysNumber} = req.body;

    if(!userID) return res.json({message: 'userID not found', status:400});

    const latestCompaniesTransactionFormatted = await transactionHelper.getAllCompaniesFormatedDataForGraph(daysNumber, userID)

    res.json({message: "Data found.", value:latestCompaniesTransactionFormatted, status:200})

}

const getAllCategoriesCustomDays = async (req, res) =>{

    const {userID, daysNumber} = req.body;

    if(!userID) return res.json({message: 'userID not found', status:400});

    const latestCategoriesTransactionFormatted = await transactionHelper.getAllCategoriesFormatedDataForGraph(daysNumber, userID)

    res.json({message: "Data found.", value:latestCategoriesTransactionFormatted, status:200})

}



module.exports =  {
    getAllTransactions,
    getAllTransactionsLatestTwoWeeks,
    getAllCompaniesLatestTwoWeeks,
    getAllCategoriesLatestTwoWeeks,
    getAllSpendingCustomDays,
    getAllRevenueCustomDays,
    getAllCompaniesCustomDays,
    getAllCategoriesCustomDays,
    addNewTransaction,
    deleteTransaction
}