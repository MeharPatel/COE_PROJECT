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
    password : {
        type : String,
        required : true,
    }

}, {timestamps : true})
//create collection
const EmployeeModal = mongoose.model('employees', EmployeeSchema)
module.exports = EmployeeModal