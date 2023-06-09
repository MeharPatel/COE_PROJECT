const mongoose = require('mongoose')

//define schema
const UserSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
    },
    password : {
        type : String,
        required : true,
    }

}, {timestamp: true})
//create collection
const UserModal = mongoose.model('users', UserSchema)
module.exports = UserModal