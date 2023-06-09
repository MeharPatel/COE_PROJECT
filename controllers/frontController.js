const UserModal = require('../models/User')
const EmployeeModal = require('../models/Employee')
const RecruiterModal = require('../models/Recruiter')
const JobModal = require('../models/Job')
class frontController{

    static login = async(req, res) => {
        try{
            res.render("login")
        }catch(error){
            console.log(error)
        }
    }
    static reg1 = async(req, res) => {
        try{
            res.render("reg1")
        }catch(error){
            console.log(error)
        }
    }
    static reg_emp = async(req, res) => {
        try{
            res.render("reg_emp")
        }catch(error){
            console.log(error)
        }
    }
    static reg_rec = async(req, res) => {
        try{
            res.render("reg_rec")
        }catch(error){
            console.log(error)
        }
    }
    static home = async(req, res) => {
        try{
            res.render("home")
        }catch(error){
            console.log(error)
        }
    }
    static jobs = async(req, res) => {
        try{
            const data = await JobModal.find()
            res.render("jobs", {d: data})
        }catch(error){
            console.log(error)
        }
    }
    static rec_jobs = async(req, res) => {
        try{
            const data = await JobModal.find()
            res.render("rec_jobs", {d: data})
        }catch(error){
            console.log(error)
        }
    }
    static my_account = async(req, res) => {
        try{
            res.render("my_account")
        }catch(error){
            console.log(error)
        }
    }
    static job_details = async(req, res) => {
        try{
            res.render("job_details")
        }catch(error){
            console.log(error)
        }
    }
    static logout = async(req, res) => {
        try{
            res.redirect("/")
        }catch(error){
            console.log(error)
        }
    }

    static decideuser = async(req, res) => {
        try{
            if(req.body.category == "employee") {
                res.redirect("reg_emp")
            } else if(req.body.category == "recruiter") {
                res.redirect("reg_rec")
            }
        }catch(error){
            console.log(error)
        }
    }

    static empinsert = async(req, res) => {
        try{
            const result = new EmployeeModal({
                name : req.body.name,
                email : req.body.email,
                phone : req.body.phone,
                age : req.body.age,
                qualification : req.body.edu,
                password : req.body.password,
            })
            await result.save()
            res.redirect('/')
            
        }catch(error){
            console.log(error)
        }
    }

    static recinsert = async(req, res) => {
        try{
            const result = new RecruiterModal({
                name : req.body.name,
                email : req.body.email,
                phone : req.body.phone,
                company : req.body.company,
                password : req.body.password,
            })
            await result.save()
            res.redirect('/')
            
        }catch(error){
            console.log(error)
        }
    }

    static addjobs = async(req, res) => {
        try{
            const result = new JobModal({
                jobname : req.body.jobname,
                tilldate : req.body.tilldate,
                fields : req.body.fields,
                description : req.body.description,
            })
            await result.save()
            res.redirect('/rec_jobs')     
        }catch(error){
            console.log(error)
        }
    }
}

module.exports = frontController