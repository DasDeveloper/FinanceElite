const express = require("express");
const mongoose = require('mongoose')
const cors = require("cors")
const dotenv = require("dotenv").config();
const session = require('express-session')
const MongoDBStore = require('connect-mongo');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const Product = require('./model/productModel')
const User = require('./model/userModel')
const purchaseHelper = require('./helper/purchaseHelper')


const app = express();


//for express-rate-limit
app.set('trust proxy', 1)

app.use(express.json());

app.use(session({
    secret: process.env.SECRET_SESSION_KEY,
    name: 'session-id',
    store: MongoDBStore.create({
        mongoUrl: process.env.DATABASE,
        ttl: Number(process.env.SESSION_MAX_AGE),
        autoRemove: 'native',
        collectionName: 'sessions'
    }),
    cookie: {
      maxAge: Number(process.env.SESSION_MAX_AGE), 
      httpOnly:true,
    },
    resave: false,
    saveUninitialized: false,
  })
    
)
  
const PORT = 8080

app.listen()

app.get('/', (req, res ) =>{
    res.send("Hello World!")
})
app.get('/api/config', (req, res) =>{
    const publishableKey = process.env.STRIPE_PUBLIC_KEY.toString()
    res.send(publishableKey);
})

const connectToDatabase = async () =>{
    await mongoose.connect(process.env.DATABASE).then(()=>{
        console.log("Successfully connected to the database!")
    })
    .catch(err =>{
        console.log(err)
    })
    
}

//Resource sharing between backend and frontend
app.use(

    cors({
        origin: process.env.WEB_URL,
        credentials: true,
    })

);

//API
app.use("/api/users", require("./routes/userRoutes.js"));
app.use('/api/auth', require('./routes/authRoutes.js'));
app.use('/api/category', require('./routes/categoryRoutes.js'))
app.use('/api/company', require('./routes/companyRoutes'))
app.use('/api/transaction', require('./routes/transactionRoutes'))
app.use('/api/product', require('./routes/productRoutes.js'))
// app.use('/api/stripe', require('./routes/stripeRoutes.js'))

app.post("/api/stripe/create-payment-intent", async (req, res) => {

  //Based on the productIDs from database
  const validatorHashMap = purchaseHelper.validatorHashMap();

  const { productID, userID } = req.body;

  if(!productID || !userID) return res.status(404).json({message: "ProductID or UserID missing"})

  const user = await User.findOne({_id: userID});
  if(!user) return res.status(404).send("User not found.");

  const userPlan = user.plan;

  if(validatorHashMap.get(userPlan).includes(productID)){

    const product = await Product.findOne({productID: productID});
    if(!product) return res.status(404).send("Product not found. Check if correct product id was given.")

    const paymentIntent = await stripe.paymentIntents.create({
        amount: product.price*100,
        currency: "cad",
    });

    res.send({
        clientSecret: paymentIntent.client_secret,
    });
  }
  else{
    return res.json({message: "Cannot purchase this plan.", status: 403})
  }
  });


app.listen(PORT, () =>{
    console.log(`Server is listening on port ${PORT}`)
    connectToDatabase();
})