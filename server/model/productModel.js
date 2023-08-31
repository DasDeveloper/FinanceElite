const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({

    name: String,
    stripeID: String,
    productID: Number,
    price: Number

})

const Product = mongoose.model("Products", productSchema);

module.exports = Product;