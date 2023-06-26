const mongoose = require('mongoose')

//define schema
const JobSchema = new mongoose.Schema({
    jobname : {
        type : String,
        required : true,
    },
    postedby : {
        type : String,
        required : true,
    },
    bycompany : {
        type : String,
        required : true,
    },
    tilldate : {
        type : Date,
        required : true,
    },
    fields : {
        type : String,
        required : true,
    },
    description : {
        type : String,
        required : true,
    },
    start_sal : {
        type : String,
        required : true,
    },
    end_sal : {
        type : String,
        required : true,
    },
    skills : {
        public_id : {
            type : String,
            required : true,
        },
        url : {
            type : String,
            required : true,
        },
    },
}, {timestamps : true})
//create collection
const JobModal = mongoose.model('jobs', JobSchema)
module.exports = JobModal