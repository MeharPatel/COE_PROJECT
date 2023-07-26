const ApplierModal = require('../models/Appliers')
const EmployeeModal = require('../models/Employee')
const RecruiterModal = require('../models/Recruiter')
const JobModal = require('../models/Job')
const bcrypt = require('bcrypt')
const cloudinary = require('cloudinary').v2
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
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
            res.render("jobs", { d: data, n: name, p: profile, message1: req.flash('error'), message2: req.flash('success') })
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
            const data = await JobModal.findById(req.params.job_id)
            const applied = await ApplierModal.findOne({ emp_id: _id, job_id : req.params.job_id })
            res.render("job_details", { n: name, p: profile, d: data, app: applied })
        } catch (error) {
            console.log(error)
        }
    }
    static rec_job_details = async (req, res) => {
        try {
            const { name, profile, _id } = req.recruiter
            const data = await JobModal.findById(req.params.job_id)
            const applier_data = await ApplierModal.find({ job_id: req.params.job_id })
            res.render("rec_job_details", { n: name, p: profile, d: data, appdata: applier_data, message1: req.flash('error'), message2: req.flash('success') })
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
        if (req.files) {
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
                        if (edu != "None") {
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
                        } else {
                            req.flash('error', 'Please Select Your Education Qualification!')
                            res.redirect('/reg_emp')
                        }
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
        const { jobname, owner, job_com, tilldate, fields, description, start_sal, end_sal } = req.body
        const tilldate1 = new Date(tilldate)
        const job = await JobModal.findOne({ jobname: jobname })
        if (job) {
            req.flash('error', 'You Have Already Announced A Job Under The Similar Title!')
            res.redirect('/rec_jobs')
        } else {
            if (jobname && owner && job_com && tilldate && fields && description && start_sal && end_sal) {
                if (today < tilldate1) {
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
                        })
                        await result.save()
                        this.SendEmailJob("addedjob", req.body.jobname, owner, req.recruiter.email)
                        req.flash('success', 'Successfully Announced A New Job!')
                        res.redirect('/rec_jobs')
                    } catch (error) {
                        console.log(error)
                    }
                } else {
                    req.flash('error', 'Please Enter Valid Date!')
                    res.redirect('/rec_jobs')
                }
            } else {
                req.flash('error', 'Please Fill Out All The Fields!')
                res.redirect('/rec_jobs')
            }
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
                        url: myresume.secure_url,
                    }
                }
                var data_emp = {
                    emp_name : req.body.name,
                    emp_email : req.body.email,
                    emp_phone : req.body.phone,
                    emp_qua : req.body.edu,
                    emp_resume : {
                        public_id : myresume.public_id,
                        url : myresume.secure_url,
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
                var data_emp = {
                    emp_name : req.body.name,
                    emp_email : req.body.email,
                    emp_phone : req.body.phone,
                    emp_qua : req.body.edu,
                }
            }
            const editdetailsemp = await EmployeeModal.findByIdAndUpdate(req.employee._id, data)
            const applier_emp = await ApplierModal.updateMany({emp_id : req.employee._id}, data_emp)
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
            var job_data = {
                bycomapny : req.body.company,
            }
            const editjobdetails = await JobModal.updateMany({postedby: req.recruiter.name}, job_data)
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
            const deleterec = await RecruiterModal.findByIdAndUpdate(req.recruiter._id)
            res.redirect('/')
        } catch (error) {
            console.log(error)
        }
    }

    static applyjob = async (req, res) => {
        try {
            const job = await JobModal.findById(req.params.job_id)
            const result = new ApplierModal({
                emp_id: req.employee._id,
                emp_name: req.employee.name,
                emp_email: req.employee.email,
                emp_phone: req.employee.phone,
                emp_qua: req.employee.qualification,
                emp_resume: {
                    public_id: req.employee.resume.public_id,
                    url: req.employee.resume.url,
                },
                //emp_score : emp_data,
                job_id: req.params.job_id,
            })
            await result.save()
            //console.log(result)
            this.SendEmailJob("appliedjob", job.jobname, req.employee.name, req.employee.email)
            req.flash('success', 'Successfully Applied To A Job!')
            res.redirect(req.get('referer'))
        } catch (error) {
            console.log(error)
        }
    }

    static applierstatusupdate = async (req, res) => {
        try {
            const job = await JobModal.findById(req.body.job_id)
            const employee = await EmployeeModal.findById(req.body.emp_id)
            var data = {
                job_id: req.body.job_id,
                emp_id: req.body.emp_id,
                approval: req.body.approval,
            }
            this.SendEmailApproval(job.jobname,employee.name,employee.email,req.body.approval)
            const updateapproval = await ApplierModal.findByIdAndUpdate(req.body.id, data)
            res.redirect(req.get('referer'))
        } catch (error) {
            console.log(error)
        }
    }

    static applierdelete = async (req, res) => {
        try {
            const deleteapp = await ApplierModal.findByIdAndDelete(req.params.app_id)
            res.redirect(req.get('referer'))
        } catch (error) {
            console.log(error)
        }
    }

    static editjob = async (req, res) => {
        let today = new Date()
        const { jobname, tilldate, fields, description, start_sal, end_sal } = req.body
        const tilldate1 = new Date(tilldate)
        const job = await JobModal.findOne({ jobname: jobname })
        if (job && job._id != req.params.id) {
            req.flash('error', 'You Have One Announced Job Under The Similar Title!')
            res.redirect(req.get('referer'))
        } else {
            if (today < tilldate1) {
                try {
                    const data = ({
                        jobname: jobname,
                        tilldate: tilldate,
                        fields: fields,
                        description: description,
                        start_sal: start_sal,
                        end_sal: end_sal,
                    })
                    await JobModal.findByIdAndUpdate(req.params.id, data)
                    req.flash('success', 'Successfully Edited Job Details!')
                    res.redirect(req.get('referer'))
                } catch (error) {
                    console.log(error)
                }
            } else {
                req.flash('error', 'Not Valid Date!')
                res.redirect(req.get('referer'))
            }
        }
    }

    static deletejob = async (req,res) => {
        try { 
            const deletejob = await JobModal.findByIdAndDelete(req.params.id)
            const appliersdelete = await ApplierModal.deleteMany({job_id : req.params.id})
            res.redirect('/rec_jobs')
        } catch (err) {
            console.log(err)
        }
    }

    static SendEmailJob = async (subject,jobname,uname,email) => {
        //this.SendEmail(comment, name, uname, email)
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: 'meharpatelextra1224@gmail.com',
                pass: 'iszxvbgccnrztxwh'
            },
          });
        
          if(subject == "addedjob") { 
          // send mail with defined transport object
          let info = await transporter.sendMail({
            from: '"meharpatelextra1224@gmail.com" <meharpatelextra1224@gmail.com>', // sender address
            to: email, // list of receivers
            subject: "Job Announced Successfully!!", // Subject line
            text: "Successfully announced a job under the title " + jobname , // plain text body
            html: `<h3>Hello ${uname},</h3><p>We are happy to inform that you have successfully announced a job with our website under the title <b>${jobname}</b>. You can check the progress on the website. You can see the list of people that applied for the job and approve or reject based on their resume and contact them for further proccess.</p> <p>We are glad that you chose our website for this job and we will love to work with you in the future, so keep up the good work!</p> <p>Thank you for chosing our website!</p> <p> We hope to work with you in the future.</p><p>Best Wishes!!</p>`, // html body
          });   
        }
          if(subject == "appliedjob") { 
          // send mail with defined transport object
          let info = await transporter.sendMail({
            from: '"meharpatelextra1224@gmail.com" <meharpatelextra1224@gmail.com>', // sender address
            to: email, // list of receivers
            subject: "Applied To Job Successfully!!", // Subject line
            text: "Successfully applied to a job under the title " + jobname , // plain text body
            html: `<h3>Hello ${uname},</h3><p>We are happy to inform that you have successfully applied a job with our website under the title <b>${jobname}</b>. You can check the approval status on the website. We will keep you updated about the approval status by email.</p> <p>We are glad that you chose our website for finding a job and we will love to work with you in the future, good luck with the results!</p> <p>Thank you for chosing our website!</p> <p> We hope to work with you in the future.</p> <p>Best Wishes!!</p>`, // html body
          });   
        }
    }
    static SendEmailApproval = async (jobname,uname,email,approval) => {
        //this.SendEmailApproval(jobname,uname,email,approval)
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: 'meharpatelextra1224@gmail.com',
                pass: 'iszxvbgccnrztxwh'
            },
          });
        
          if(approval == "Approved") { 
          // send mail with defined transport object
          let info = await transporter.sendMail({
            from: '"meharpatelextra1224@gmail.com" <meharpatelextra1224@gmail.com>', // sender address
            to: email, // list of receivers
            subject: "Approved For Interview!!", // Subject line
            text: "Congratulation!! you are approved for interview for the job under the title " + jobname , // plain text body
            html: `<h3>Hello ${uname},</h3><p>We are happy to inform that you have successfully passed the first round of the job under the title <b>${jobname}</b>. You are now listed for interview and the company will contact you soon. Check the website for assurance. The company has viewed your resume and are happy to inform that you are listed for interview round.</p> <p>We are glad that you are selected for the interview round!! This is Exciting news!!</p> <p>Thank you for chosing our website!</p> <p> We hope you pass the interview round too!! Work Hard and All the very best for the interview!! We are happy that we could help you get here!</p><p>Best Wishes!!</p>`, // html body
          });   
        }
          if(approval == "Rejected") { 
          // send mail with defined transport object
          let info = await transporter.sendMail({
            from: '"meharpatelextra1224@gmail.com" <meharpatelextra1224@gmail.com>', // sender address
            to: email, // list of receivers
            subject: "Rejected, Sorry! Better Luck Next Time!!", // Subject line
            text: "Your Profile has been rejected from the job under the title " + jobname , // plain text body
            html: `<h3>Hello ${uname},</h3><p>We are very sorry to inform you that the company has rejected your application for the job under the title <b>${jobname}</b>. You can reapply for another jobs, don't feel descouraged by this. Your luck can still turn around.</p> <p>We will be very happy to help you find another jobs. Don't stop the hussle, keep up your hard work, apply for other jobs on our website.</p> <p>Thank you for chosing our website!</p> <p> We hope to work with you in the future.</p> <p>Better Luck Next Tiime!!</p> <p>Best Wishes!!</p>`, // html body
          });   
        }
    }



}

module.exports = frontController