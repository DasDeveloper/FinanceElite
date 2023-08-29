const Product = require('../model/productModel')



const getAllProducts = async (req, res) =>{

try{
    const products = await Product.find();

    res.status(200).send(products)

}catch(err){
    console.log(err)
    res.status(400).send("Unable to fetch all products.")
    
    }
}

const addNewProduct = async (req, res) =>{

    const {stripeID, productID, name, price} = req.body;
    if(!stripeID || !productID || !name || !price) return res.status(400).send("Missing fields.")

    await Product.create({stripeID, productID, name, price})

    return res.status(200).send('Successfully added a new product.')
}

const getProductByProductID = async (req, res) =>{

    const {productID} = req.body;
    if(!productID) return res.status(400).send("Field missing.")

    const product = await Product.findOne({productID:productID});

    if(!product) return res.status(400).send("Product not found.")

    return res.json({message: "Product found.", status:200, productStripeID:product.stripeID, productPrice: product.price})
}

const getProductByProductName = async (req, res) =>{

    const {name} = req.body;
    if(!name) return res.status(400).send("Field missing.")

    const product = await Product.findOne({name:name});

    if(!product) return res.status(400).send("Product not found.")

    return res.json({message: "Product found.", status:200, productStripeID:product.stripeID, productPrice: product.price})
}


module.exports = {

    getAllProducts,
    addNewProduct,
    getProductByProductID,
    getProductByProductName


}