const User = require('../model/userModel')
const bcryptjs = require("bcryptjs")
const saltRounds = 12;


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





module.exports = {
    createNewUser
}