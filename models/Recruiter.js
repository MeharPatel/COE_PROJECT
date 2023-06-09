const mongoose = require('mongoose')

//define schema
const RecruiterSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
    },
    phone : {
        type : String,
        required : true,
    },
    company : {
        type : String,
        required : true,
    },
    password : {
        type : String,
        required : true,
    }

}, {timestamps : true})
//create collection
const RecruiterModal = mongoose.model('recruiters', RecruiterSchema)
module.exports = RecruiterModal