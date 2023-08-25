const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({

    category: String,
    userID: String

})

const Category = mongoose.model("Categories", categorySchema);

module.exports = Category;