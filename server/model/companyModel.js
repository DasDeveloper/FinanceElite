const mongoose = require('mongoose')

const companySchema = new mongoose.Schema({

    company: String,
    userID: String

})

const Company = mongoose.model("Companies", companySchema);

module.exports = Company;