const express = require("express");
const mongoose = require('mongoose')
const cors = require("cors")
const dotenv = require("dotenv").config();
const session = require('express-session')
const MongoDBStore = require('connect-mongo');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)


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
    const publishableKey = process.env.STRIPE_PUBLIC_KEY
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
// app.use('/api/stripe', require('./routes/stripeRoutes.js'))

app.post('/api/stripe/create-payment-intent', (req, res) =>{


})



app.listen(PORT, () =>{
    console.log(`Server is listening on port ${PORT}`)
    connectToDatabase();
})