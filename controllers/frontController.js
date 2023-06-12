const UserModal = require('../models/User')
const EmployeeModal = require('../models/Employee')
const RecruiterModal = require('../models/Recruiter')
const JobModal = require('../models/Job')
const bcrypt = require('bcrypt')
const cloudinary = require('cloudinary').v2
const jwt = require('jsonwebtoken')
cloudinary.config({ 
    cloud_name: 'dk0yb5sm7', 
    api_key: '855991814688618', 
    api_secret: 'MYyLQ7kgRpdTnKw5HHCX00rpjJU',
    secure: false,
  });

class frontController{

    static login = async(req, res) => {
        try{
            res.render("login", {message: req.flash('error')})
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
            res.render("reg_emp", {message: req.flash('error')})
        }catch(error){
            console.log(error)
        }
    }
    static reg_rec = async(req, res) => {
        try{
            res.render("reg_rec", {message: req.flash('error')})
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
    static rec_home = async(req, res) => {
        try{
            res.render("rec_home")
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
            res.render("rec_jobs", {d: data, message1: req.flash('error'), message2: req.flash('success')})
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
    static rec_my_account = async(req, res) => {
        try{
            res.render("rec_my_account")
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
    static rec_job_details = async(req, res) => {
        try{
            res.render("rec_job_details")
        }catch(error){
            console.log(error)
        }
    }
    static logout = async(req, res) => {
        try{
            res.clearCookie('token')
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
        const resumeFile = req.files.resume
        const resumeupload = await cloudinary.uploader.upload(resumeFile.tempFilePath, {
            folder : 'COE_Project/Resume'
        })
        const {name, email, phone, age, edu, password, c_password} = req.body
        const employee = await EmployeeModal.findOne({email : email})
        if(employee){
            req.flash('error', 'You Already Have An Account!')
            res.redirect('/reg_emp')
        } else {
            if(name && email && password && c_password && age && edu){
                if(resumeFile){
                    if(age >= 18){
                        if(password == c_password){
                            try{
                                const hashpassword = await bcrypt.hash(password, 10)
                                const result = new EmployeeModal({
                                    name : name,
                                    email : email,
                                    phone : phone,
                                    age : age,
                                    qualification : edu,
                                    password : hashpassword,
                                    resume : {
                                        public_id : resumeupload.public_id,
                                        url : resumeupload.secure_url,
                                    },
                                })
                                await result.save()
                                res.redirect('/')
                                
                            } catch (error){
                                console.log(error)
                            }
                        } else {
                            req.flash('error', 'Passwords Do Not Match!')
                            res.redirect('/reg_emp')
                        }
                    } else{
                        req.flash('error', 'Your Age Is Not Enough To Use This Website!')
                        res.redirect('/reg_emp')
                    }
                } else { 
                    req.flash('error', 'Please Enter Your Resume!')
                    res.redirect('/reg_emp')
                }
            } else {
                req.flash('error', 'Please Fill Out All The Fields!')
                res.redirect('/reg_emp')
            }
        }
    }

    static recinsert = async(req, res) => {
        const {name, email, phone, company, password, c_password} = req.body
        const recruiter = await RecruiterModal.findOne({email : email})
        if(recruiter){
            req.flash('error', 'You Already Have An Account!')
            res.redirect('/reg_rec')
        } else {
            if(name && email && password && c_password){
                if(password == c_password){
                    try{
                        const hashpassword = await bcrypt.hash(password, 10)
                        const result = new RecruiterModal({
                            name : name,
                            email : email,
                            phone : phone,
                            company : company,
                            password : hashpassword,
                        })
                        await result.save()
                        res.redirect('/')
                        
                    }catch(error){
                        console.log(error)
                    }
                } else {
                    req.flash('error', 'Passwords Do not Match!')
                    res.redirect('/reg_rec')
                }
            } else {
                req.flash('error', 'Please Fill Out All The Details!')
                res.redirect('/reg_rec')
            }
        }
    }

    static verifylogin = async(req, res) => {
        try{
            const {email, password} = req.body
            if(email && password){
                const employee = await EmployeeModal.findOne({email : email})
                const recruiter = await RecruiterModal.findOne({email : email})
                if(employee != null){
                    const ismatched = await bcrypt.compare(password, employee.password)
                    if(ismatched){
                        //generate token
                        const token = jwt.sign({id : employee._id},'Mehar Patel')
                        res.cookie('token', token)
                        res.redirect('home')
                    } else {
                        req.flash('error', 'Incorrect Password!')
                        res.redirect('/')
                    }
                } else if(recruiter != null) {
                    const ismatched = await bcrypt.compare(password, recruiter.password)
                    if(ismatched){
                        //generate token
                        const token = jwt.sign({id : recruiter._id},'Mehar Patel')
                        res.cookie('token', token)
                        res.redirect('rec_home')
                    } else {
                        req.flash('error', 'Incorrect Password!')
                        res.redirect('/')
                    }
                } else {
                    req.flash('error', 'Please Register First!')
                    res.redirect('/')
                }
            } else {
                req.flash('error', 'Please Enter Your Email & Password!')
                res.redirect('/')
            }
        }catch(error){
            console.log(error)
        }
    }

    static addjobs = async(req, res) => {
        const skillsFile = req.files.skills
        const skillsupload = await cloudinary.uploader.upload(skillsFile.tempFilePath, {
            folder : 'COE_Project/Skills'
        })
        const {jobname, tilldate, fields, description, start_sal, end_sal} = req.body
        const job = await JobModal.findOne({jobname : jobname})
        if(job){
            req.flash('error', 'You Have Already Announced A Job Under The Similar Title!')
            res.redirect('/rec_jobs')
        } else {
            if(jobname && tilldate && fields && description && start_sal && end_sal){
                if(skillsFile){
                    try{
                        const result = new JobModal({
                            jobname : jobname,
                            tilldate : tilldate,
                            fields : fields,
                            description : description,
                            start_sal : start_sal,
                            end_sal : end_sal,
                            skills : {
                                public_id : skillsupload.public_id,
                                url : skillsupload.secure_url,
                            },
                        })
                        await result.save()
                        req.flash('success', 'Successfully Announced A New Job!')
                        res.redirect('/rec_jobs')
                    } catch (error){
                        console.log(error)
                    }
                } else { 
                    req.flash('error', 'Please Enter The File Listed With Skills!')
                    res.redirect('/rec_jobs')
                }
            } else {
                req.flash('error', 'Please Fill Out All The Fields!')
                res.redirect('/rec_jobs')
            }
        }
    }
}

module.exports = frontController