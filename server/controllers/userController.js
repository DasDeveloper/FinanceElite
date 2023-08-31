const User = require('../model/userModel')
const bcryptjs = require("bcryptjs")
const saltRounds = 12;
const purchaseHelper = require('../helper/purchaseHelper')


const createNewUser = async (req, res) =>{

    const {firstname, lastname, email, password} = req.body;

    if(!firstname || !lastname || !email || !password ){
        return res.status(422).json({
            message: "Some fields are missing",
            status: 422
        })
    }
    const hashedPassword = await bcryptjs.hash(password, saltRounds);
    
    try{

    const user = await User.findOne({email:email});
    
    

    if(user){
        res.json({
            message:"Email is already used!",
            status:409
    })
        return;
    }

    const newUser = {
        firstname,
        lastname,
        role:"USER",
        email,
        password:hashedPassword
    }

    await User.create(newUser)
    res.json({
        message:"User successfully created!",
        status:200
})

    }catch(err){
        console.log(err)
    }
    
}

const getUserPlan = async (req,res) =>{
    const {userID} = req.body;

    if(!userID) return res.json({message: "Some fields are missing",status: 422})

    const user = await User.findOne({_id: userID});

    if(!user) return res.status(404).json({message:"User not found.", status:404})

    return res.json({message: 'User plan found.', plan:user.plan, status:200})




}


const upgradeUserPurchase = async (req, res) =>{
    

    const validatorHashMap = purchaseHelper.validatorHashMap();

    const {userID, productID} = req.body;
    
    if(!userID || !productID) return res.json({message: "Some fields are missing",status: 422})

    const user = await User.findOne({_id: userID});

    if (!user) return res.status(404).json({message:"User not found.", status:404})
    const userPlan = user.plan;

    if(!validatorHashMap.get(userPlan).includes(productID)){
        return res.status(403).send("User can't purchase this item.")
    }

    const productIDToPlanMap = purchaseHelper.productIDToPlanHashMap()
    user.plan = productIDToPlanMap.get(productID);
    await user.save();
    return res.json({message: "User plan upgraded.", status:200})

}



module.exports = {
    createNewUser,
    upgradeUserPurchase,
    getUserPlan
}