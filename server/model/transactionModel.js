const mongoose = require('mongoose')


const transactionSchema = new mongoose.Schema({
    userID: String,
    date: Date,
    amount: Number,
    paymentType: String,
    type: String,
    company: String,
    category: String
})


const Transaction = mongoose.model("Transactions", transactionSchema);

module.exports = Transaction;