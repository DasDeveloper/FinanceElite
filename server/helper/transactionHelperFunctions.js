const Transaction = require('../model/transactionModel')

const getPastNDays = (n) =>{
    const pastNDays = [];
  
    for (let i = n-1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      date.setHours(0, 0, 0, 0); // Set time to midnight
      
      const jsonDate = {
        date: date,
        amount: 0
      };
      
      pastNDays.push(jsonDate);
    }
  
    return pastNDays;
  }

  const getFormatedDataForGraph = async (n, type, userID) =>{

    const currentDate = new Date();

    const earliestDate = new Date();
    earliestDate.setDate(currentDate.getDate()-n);

    const lastNDaysDate = getPastNDays(n)
    const latestTypeTransactionsHashMap = new Map();
    const latestTypeTransactionsFormatted = []

    lastNDaysDate.map(object =>{
      latestTypeTransactionsHashMap.set(object.date.getTime(), object.amount)
    })

    const latestTypeTransactions = await Transaction.find({userID: userID, type:type, date:{
      $gte:earliestDate,
      $lte:currentDate
    }}, {'_id':0, 'date':1, 'amount':1}).sort([['date', 1]])

    latestTypeTransactions.map(object =>{
      const tempAmount = latestTypeTransactionsHashMap.get(object.date.getTime())
      latestTypeTransactionsHashMap.set(object.date.getTime(), object.amount + tempAmount)
    })

    latestTypeTransactionsHashMap.forEach((value, key, latestTypeTransactionsHashMap) =>{

        latestTypeTransactionsFormatted.push({'x':new Date(key).toISOString().substring(5,10), 'y':value})
    })

    
    return latestTypeTransactionsFormatted;

  }

  const getAllCompaniesFormatedDataForGraph = async (n, userID) =>{

    const currentDate = new Date();

    const earliestDate = new Date();
    earliestDate.setDate(currentDate.getDate()-n);

    const latestCompanyTransactionHashMap = new Map();

    const transactions = await Transaction.find({ userID:userID, type:'Spending', date:{
        $gte:earliestDate,
        $lte:currentDate
    }}, {'_id':0, 'company': 1, 'amount':1})

    let totalAmount = 0;

    transactions.map(object =>{
       totalAmount = totalAmount + object.amount;
        latestCompanyTransactionHashMap.set(object.company, 0)
    })

    transactions.map(object =>{
        const tempAmount = latestCompanyTransactionHashMap.get(object.company)
        latestCompanyTransactionHashMap.set(object.company, object.amount + tempAmount)
    })

    const latestCompaniesTransactionFormatted = []

    latestCompanyTransactionHashMap.forEach((value, key, latestCompanyTransactionHashMap) =>{

        if(key===null){
            latestCompaniesTransactionFormatted.push({'id':"unknown", 'label':"unknown", 'value':(value*1.0/totalAmount*100).toFixed(2)})
        }
        else{
        latestCompaniesTransactionFormatted.push({'id':key.toLowerCase(), 'label':key.toLowerCase(), 'value':(value*1.0/totalAmount*100).toFixed(2)})
        }
    })

    return latestCompaniesTransactionFormatted;


  }

  const getAllCategoriesFormatedDataForGraph = async (n, userID) =>{

    const currentDate = new Date();

    const earliestDate = new Date();
    earliestDate.setDate(currentDate.getDate()-n);

    const latestCompanyTransactionHashMap = new Map();

    const transactions = await Transaction.find({ userID:userID, type:'Spending', date:{
        $gte:earliestDate,
        $lte:currentDate
    }}, {'_id':0, 'category': 1, 'amount':1})

    let totalAmount = 0;

    transactions.map(object =>{
       totalAmount = totalAmount + object.amount;
        latestCompanyTransactionHashMap.set(object.category, 0)
    })

    transactions.map(object =>{
        const tempAmount = latestCompanyTransactionHashMap.get(object.category)
        latestCompanyTransactionHashMap.set(object.category, object.amount + tempAmount)
    })

    const latestCompaniesTransactionFormatted = []

    latestCompanyTransactionHashMap.forEach((value, key, latestCompanyTransactionHashMap) =>{

        if(key===null){
            latestCompaniesTransactionFormatted.push({'id':"unknown", 'label':"unknown", 'value':(value*1.0/totalAmount*100).toFixed(2)})
        }
        else{
        latestCompaniesTransactionFormatted.push({'id':key.toLowerCase(), 'label':key.toLowerCase(), 'value':(value*1.0/totalAmount*100).toFixed(2)})
        }
    })

    return latestCompaniesTransactionFormatted;

  }


  module.exports ={
    getPastNDays, 
    getFormatedDataForGraph,
    getAllCompaniesFormatedDataForGraph,
    getAllCategoriesFormatedDataForGraph
  }

