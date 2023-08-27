const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    role: {type: String, default:'USER'},
    email: String,
    password: String,
    plan: {type: String, default: 'FREE'}

});


const Users = mongoose.model("Users", userSchema);

module.exports = Users;