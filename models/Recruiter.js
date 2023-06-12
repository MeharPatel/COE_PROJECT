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
    },
    profile : {
        public_id : {
            type : String,
            default : 'COE_Project/Profile/default_user_modjhr.jpg',
        },
        url : {
            type : String,
            default : 'https://res.cloudinary.com/dk0yb5sm7/image/upload/v1686577120/COE_Project/Profile/default_user_modjhr.jpg',
        },
    },

}, {timestamps : true})
//create collection
const RecruiterModal = mongoose.model('recruiters', RecruiterSchema)
module.exports = RecruiterModal