const mongoose = require('mongoose')

//define schema
const JobSchema = new mongoose.Schema({
    jobname : {
        type : String,
        required : true,
    },
    tilldate : {
        type : String,
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

}, {timestamps : true})
//create collection
const JobModal = mongoose.model('jobs', JobSchema)
module.exports = JobModal