const User = require('../model/userModel')
const bcryptjs = require("bcryptjs")

const login = async (req, res) =>{


    if(req.session.user) return res.json({message:"Already logged in", alreadyLoggedIn:true})

    const {email, password} = req.body;

    if(!email || !password) return res.json({message: "Some fields are missing", status:422});

    const user = await User.findOne({email: email});

    if(!user) return res.json({message: "Wrong credentials", status:401})

    const result = await bcryptjs.compare(password, user.password);

    if(!result) return res.json({message: "Wrong credentials", status:401});

    req.session.user = {userID: user.id, userRole: user.role, userPlan: user.plan, firstname: user.firstname, lastname: user.lastname};

    return res.json({message: "Successfully logged in", status:200})

}

const getSession = async (req,res) =>{

    const {user} = req.session;

    if(!user) return res.json({message: "Session not available", status:401});

    return res.json({message: "Session found.", status:200, user:user})

}

const updateSession = async (req, res) =>{
    const {user} = req.session;

    if(!user) return res.json({message: "Session not available", status:401});

    const userMongo = await User.findOne({_id: user.userID})

    if(!userMongo) returnres.json({message: "Unable to update the session.", status:404})

    user.userPlan = userMongo.plan;
    req.session.user = user;
    req.session.save();
    return res.json({message: "Session was updated", status:200})
}


const logout = async (req, res) =>{

    req.session.destroy(err=> {
            if(err) console.log(err);
            return res.json({message: "Successfully destroyed session", status:200})
        })
}

module.exports = {

    login, 
    getSession, 
    updateSession,
    logout
    
}