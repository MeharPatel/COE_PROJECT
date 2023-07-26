const mongoose = require('mongoose')

//define schema
const ApplierSchema = new mongoose.Schema({
    emp_id : {
        type : String,
        required : true,
    },
    emp_name : {
        type : String,
        required : true,
    },
    emp_email : {
        type : String,
        required : true,
    },
    emp_phone : {
        type : String,
        required : true,
    },
    emp_qua : {
        type : String,
        required : true,
    },
    emp_resume : {
        public_id : {
            type : String,
            required : true,
        },
        url : {
            type : String,
            required : true,
        },
    },
    // emp_score : {
    //     type : Object,
    //     required : true
    // },
    job_id : {
        type : String,
        required : true,
    },
    approval : {
        type : String,
        default : "Pending",
    },
}, {timestamps : true})
//create collection
const ApplierModal = mongoose.model('appliers', ApplierSchema)
module.exports = ApplierModal