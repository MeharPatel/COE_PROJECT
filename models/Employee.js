const mongoose = require('mongoose')

//define schema
const EmployeeSchema = new mongoose.Schema({
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
    age : {
        type : String,
        required : true,
    },
    qualification : {
        type : String,
        required : true,
    },
    resume : {
        public_id : {
            type : String,
            required : true,
        },
        url : {
            type : String,
            required : true,
        },
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
    password : {
        type : String,
        required : true,
    }

}, {timestamps : true})
//create collection
const EmployeeModal = mongoose.model('employees', EmployeeSchema)
module.exports = EmployeeModal