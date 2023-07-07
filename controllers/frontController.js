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

class frontController {

    static login = async (req, res) => {
        try {
            res.render("login", { message: req.flash('error') })
        } catch (error) {
            console.log(error)
        }
    }
    static reg1 = async (req, res) => {
        try {
            res.render("reg1")
        } catch (error) {
            console.log(error)
        }
    }
    static reg_emp = async (req, res) => {
        try {
            res.render("reg_emp", { message: req.flash('error') })
        } catch (error) {
            console.log(error)
        }
    }
    static reg_rec = async (req, res) => {
        try {
            res.render("reg_rec", { message: req.flash('error') })
        } catch (error) {
            console.log(error)
        }
    }
    static home = async (req, res) => {
        try {
            const { name, profile, _id } = req.employee
            res.render("home", { n: name, p: profile })
        } catch (error) {
            console.log(error)
        }
    }
    static rec_home = async (req, res) => {
        try {
            const { name, profile, _id } = req.recruiter
            res.render("rec_home", { n: name, p: profile })
        } catch (error) {
            console.log(error)
        }
    }
    static jobs = async (req, res) => {
        try {
            const { name, profile, _id } = req.employee
            const data = await JobModal.find()
            res.render("jobs", { d: data, n: name, p: profile })
        } catch (error) {
            console.log(error)
        }
    }
    static rec_jobs = async (req, res) => {
        try {
            const { name, profile, company, _id } = req.recruiter
            const data = await JobModal.find()
            res.render("rec_jobs", { d: data, n: name, c: company, p: profile, message1: req.flash('error'), message2: req.flash('success') })
        } catch (error) {
            console.log(error)
        }
    }
    static my_account = async (req, res) => {
        try {
            const { name, email, profile, phone, age, qualification, resume, _id } = req.employee
            res.render("my_account", { n: name, e: email, p: profile, ph: phone, a: age, q: qualification, r: resume, message1: req.flash('error'), message2: req.flash('success') })
        } catch (error) {
            console.log(error)
        }
    }
    static rec_my_account = async (req, res) => {
        try {
            const { name, email, profile, phone, company, _id } = req.recruiter
            res.render("rec_my_account", { n: name, e: email, p: profile, ph: phone, c: company, message1: req.flash('error'), message2: req.flash('success') })
        } catch (error) {
            console.log(error)
        }
    }
    static job_details = async (req, res) => {
        try {
            const { name, profile, _id } = req.employee
            res.render("job_details", { n: name, p: profile })
        } catch (error) {
            console.log(error)
        }
    }
    static rec_job_details = async (req, res) => {
        try {
            const { name, profile, _id } = req.recruiter
            res.render("rec_job_details", { n: name, p: profile })
        } catch (error) {
            console.log(error)
        }
    }
    static logout = async (req, res) => {
        try {
            res.clearCookie('token')
            res.redirect("/")
        } catch (error) {
            console.log(error)
        }
    }

    static decideuser = async (req, res) => {
        try {
            if (req.body.category == "employee") {
                res.redirect("reg_emp")
            } else if (req.body.category == "recruiter") {
                res.redirect("reg_rec")
            }
        } catch (error) {
            console.log(error)
        }
    }

    static empinsert = async (req, res) => {
        if (req.files.resume) {
            const resumeFile = req.files.resume
            const resumeupload = await cloudinary.uploader.upload(resumeFile.tempFilePath, {
                folder: 'COE_Project/Resume'
            })
            const { name, email, phone, age, edu, password, c_password } = req.body
            const employee = await EmployeeModal.findOne({ email: email })
            if (employee) {
                req.flash('error', 'You Already Have An Account!')
                res.redirect('/reg_emp')
            } else {
                if (name && email && phone && password && c_password && age) {
                    if (age >= 18) {
                        //if (edu == -1) {
                            if (password == c_password) {
                                try {
                                    const hashpassword = await bcrypt.hash(password, 10)
                                    const result = new EmployeeModal({
                                        name: name,
                                        email: email,
                                        phone: phone,
                                        age: age,
                                        qualification: edu,
                                        password: hashpassword,
                                        resume: {
                                            public_id: resumeupload.public_id,
                                            url: resumeupload.secure_url,
                                        },
                                    })
                                    await result.save()
                                    res.redirect('/')

                                } catch (error) {
                                    console.log(error)
                                }
                            } else {
                                req.flash('error', 'Passwords Do Not Match!')
                                res.redirect('/reg_emp')
                            }
                        /*} else {
                            req.flash('error', 'Please Select Your Education Qualification!')
                            res.redirect('/reg_emp')
                        }*/
                    } else {
                        req.flash('error', 'Your Age Is Not Enough To Use This Website!')
                        res.redirect('/reg_emp')
                    }
                } else {
                    req.flash('error', 'Please Fill Out All The Fields!')
                    res.redirect('/reg_emp')
                }
            }
        } else {
            req.flash('error', 'Please Enter Your Resume!')
            res.redirect('/reg_emp')
        }
    }

    static recinsert = async (req, res) => {
        const { name, email, phone, company, password, c_password } = req.body
        const recruiter = await RecruiterModal.findOne({ email: email })
        if (recruiter) {
            req.flash('error', 'You Already Have An Account!')
            res.redirect('/reg_rec')
        } else {
            if (name && email && password && c_password) {
                if (password == c_password) {
                    try {
                        const hashpassword = await bcrypt.hash(password, 10)
                        const result = new RecruiterModal({
                            name: name,
                            email: email,
                            phone: phone,
                            company: company,
                            password: hashpassword,
                        })
                        await result.save()
                        res.redirect('/')

                    } catch (error) {
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

    static verifylogin = async (req, res) => {
        try {
            const { email, password } = req.body
            if (email && password) {
                const employee = await EmployeeModal.findOne({ email: email })
                const recruiter = await RecruiterModal.findOne({ email: email })
                if (employee != null) {
                    const ismatched = await bcrypt.compare(password, employee.password)
                    if (ismatched) {
                        //generate token
                        const token = jwt.sign({ id: employee._id }, 'Mehar Patel')
                        res.cookie('token', token)
                        res.redirect('home')
                    } else {
                        req.flash('error', 'Incorrect Password!')
                        res.redirect('/')
                    }
                } else if (recruiter != null) {
                    const ismatched = await bcrypt.compare(password, recruiter.password)
                    if (ismatched) {
                        //generate token
                        const token = jwt.sign({ id: recruiter._id }, 'Mehar Patel')
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
        } catch (error) {
            console.log(error)
        }
    }

    static addjobs = async (req, res) => {
        let today = new Date()
        if (req.files) {
            const skillsFile = req.files.skills
            const skillsupload = await cloudinary.uploader.upload(skillsFile.tempFilePath, {
                folder: 'COE_Project/Skills'
            })
            const { jobname, owner, job_com, tilldate, fields, description, start_sal, end_sal } = req.body
            const job = await JobModal.findOne({ jobname: jobname })
            if (job) {
                req.flash('error', 'You Have Already Announced A Job Under The Similar Title!')
                res.redirect('/rec_jobs')
            } else {
                if (jobname && owner && job_com && tilldate && fields && description && start_sal && end_sal) {
                    
                        try {
                            const result = new JobModal({
                                jobname: jobname,
                                postedby: owner,
                                bycompany: job_com,
                                tilldate: tilldate,
                                fields: fields,
                                description: description,
                                start_sal: start_sal,
                                end_sal: end_sal,
                                skills: {
                                    public_id: skillsupload.public_id,
                                    url: skillsupload.secure_url,
                                },
                            })
                            await result.save()
                            req.flash('success', 'Successfully Announced A New Job!')
                            res.redirect('/rec_jobs')
                        } catch (error) {
                        console.log(error)
                        }  
                    /* } else {
                        req.flash('error', 'Please Enter Valid Date!')
                    res.redirect('/rec_jobs')
                    }*/
                } else {
                    req.flash('error', 'Please Fill Out All The Fields!')
                    res.redirect('/rec_jobs')
                }
            }
        } else {
            req.flash('error', 'Please Enter The File Listed With Skills!')
            res.redirect('/rec_jobs')
        }

    }

    static editprofileemp = async (req, res) => {
        try {
            if (req.files) {
                const employee = await EmployeeModal.findById(req.employee._id)
                const profile_id = employee.profile.public_id
                if (profile_id != "COE_Project/Profile/default_user_modjhr.jpg") {
                    await cloudinary.uploader.destroy(profile_id)
                }
                const file = req.files.profile
                const myprofile = await cloudinary.uploader.upload(file.tempFilePath, {
                    folder: "COE_Project/Profile"
                })
                var data = {
                    name: req.body.name,
                    email: req.body.email,
                    profile: {
                        public_id: myprofile.public_id,
                        url: myprofile.secure_url
                    }
                }
            }
            const editprofileemp = await EmployeeModal.findByIdAndUpdate(req.employee._id, data)
            res.redirect('/my_account')
        } catch (error) {
            console.log(error)
        }
    }
    static editprofilerec = async (req, res) => {
        try {
            if (req.files) {
                const recruiter = await RecruiterModal.findById(req.recruiter._id)
                const profile_id = recruiter.profile.public_id
                if (profile_id != "COE_Project/Profile/default_user_modjhr.jpg") {
                    await cloudinary.uploader.destroy(profile_id)
                }
                const file = req.files.profile
                const myprofile = await cloudinary.uploader.upload(file.tempFilePath, {
                    folder: "COE_Project/Profile"
                })
                var data = {
                    name: req.body.name,
                    email: req.body.email,
                    profile: {
                        public_id: myprofile.public_id,
                        url: myprofile.secure_url
                    }
                }
            }
            const editprofilerec = await RecruiterModal.findByIdAndUpdate(req.recruiter._id, data)
            res.redirect('/rec_my_account')
        } catch (error) {
            console.log(error)
        }
    }

    static changepassemp = async (req, res) => {
        try {
            const { name, email, image, _id } = req.employee
            const { oldpass, newpass, conpass } = req.body
            if (oldpass && newpass && conpass) {
                const employee = await EmployeeModal.findById(_id)
                const ismatch = await bcrypt.compare(oldpass, employee.password)
                if (!ismatch) {
                    req.flash('error', 'Old Password Does not match!!')
                    res.redirect('/my_account')
                } else {
                    if (newpass !== conpass) {
                        req.flash('error', 'New Password and Confirm Password Does Not Match')
                        res.redirect('/my_account')
                    } else {
                        const newhashpass = await bcrypt.hash(newpass, 10)
                        await EmployeeModal.findByIdAndUpdate(_id, {
                            $set: { password: newhashpass },
                        });
                        req.flash('success', 'Password Changed Successfully')
                        res.redirect('/my_account')
                    }
                }
            } else {
                req.flash('error', 'Enter the Details!!')
                res.redirect('/my_account')
            }
        } catch (error) {
            console.log(error)
        }
    }
    static changepassrec = async (req, res) => {
        try {
            const { name, email, image, _id } = req.recruiter
            const { oldpass, newpass, conpass } = req.body
            if (oldpass && newpass && conpass) {
                const recruiter = await RecruiterModal.findById(_id)
                const ismatch = await bcrypt.compare(oldpass, recruiter.password)
                if (!ismatch) {
                    req.flash('error', 'Old Password Does not match!!')
                    res.redirect('/rec_my_account')
                } else {
                    if (newpass !== conpass) {
                        req.flash('error', 'New Password and Confirm Password Does Not Match')
                        res.redirect('/rec_my_account')
                    } else {
                        const newhashpass = await bcrypt.hash(newpass, 10)
                        await RecruiterModal.findByIdAndUpdate(_id, {
                            $set: { password: newhashpass },
                        });
                        req.flash('success', 'Password Changed Successfully')
                        res.redirect('/rec_my_account')
                    }
                }
            } else {
                req.flash('error', 'Enter the Details!!')
                res.redirect('/rec_my_account')
            }
        } catch (error) {
            console.log(error)
        }
    }

    static editdetailsemp = async (req, res) => {
        try {
            const { qualification, age } = req.employee
            if (req.files) {
                const employee = await EmployeeModal.findById(req.employee._id)
                const resume_id = employee.resume.public_id
                await cloudinary.uploader.destroy(resume_id)
                const file = req.files.resume
                const myresume = await cloudinary.uploader.upload(file.tempFilePath, {
                    folder: "COE_Project/Resume"
                })
                var data = {
                    name: req.body.name,
                    email: req.body.email,
                    phone: req.body.phone,
                    age: (req.body.age < 18) ? age : req.body.age,
                    qualification: (req.body.edu == -1) ? qualification : req.body.edu,
                    resume: {
                        public_id: myresume.public_id,
                        url: myresume.secure_url
                    }
                }
            } else {
                var data = {
                    name: req.body.name,
                    email: req.body.email,
                    phone: req.body.phone,
                    age: (req.body.age < 18) ? age : req.body.age,
                    qualification: (req.body.edu == -1) ? qualification : req.body.edu,
                }
            }
            const editdetailsemp = await EmployeeModal.findByIdAndUpdate(req.employee._id, data)
            res.redirect('/my_account')
        } catch (error) {
            console.log(error)
        }
    }
    static editdetailsrec = async (req, res) => {
        try {
            var data = {
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                company: req.body.company,
            }
            const editdetailsrec = await RecruiterModal.findByIdAndUpdate(req.recruiter._id, data)
            res.redirect('/rec_my_account')
        } catch (error) {
            console.log(error)
        }
    }

    static deleteemp = async (req, res) => {
        try {
            const employee = await EmployeeModal.findById(req.employee._id)
            const profile_id = employee.profile.public_id
            if (profile_id != "COE_Project/Profile/default_user_modjhr.jpg") {
                await cloudinary.uploader.destroy(profile_id)
            }
            const resume_id = employee.profile.public_id
            await cloudinary.uploader.destroy(resume_id)
            const deleteemp = await EmployeeModal.findByIdAndDelete(req.employee._id)
            res.redirect('/')
        } catch (error) {
            console.log(error)
        }
    }
    static deleterec = async (req, res) => {
        try {
            const recruiter = await RecruiterModal.findById(req.recruiter._id)
            const profile_id = recruiter.profile.public_id
            if (profile_id != "COE_Project/Profile/default_user_modjhr.jpg") {
                await cloudinary.uploader.destroy(profile_id)
            }
            const deleterec = awaiRecruiterModal.findByIdAndUpdate(req.recruiter._id)
            res.redirect('/')
        } catch (error) {
            console.log(error)
        }
    }

    






}

module.exports = frontController