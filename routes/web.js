const express = require('express')
const frontController = require('../controllers/frontController')
const route = express.Router()
const CheckEmployeeAuth = require('../middleware/empauth')
const CheckRecruiterAuth = require('../middleware/recauth')

//router
route.get('/', frontController.login)
route.get('/reg1', frontController.reg1)
route.get('/reg_emp', frontController.reg_emp)
route.get('/reg_rec', frontController.reg_rec)

route.get('/home', CheckEmployeeAuth, frontController.home)
route.get('/jobs', CheckEmployeeAuth, frontController.jobs)
route.get('/my_account', CheckEmployeeAuth, frontController.my_account)
route.get('/job_details/:job_id', CheckEmployeeAuth, frontController.job_details)

route.get('/rec_home', CheckRecruiterAuth, frontController.rec_home)
route.get('/rec_jobs', CheckRecruiterAuth, frontController.rec_jobs)
route.get('/rec_my_account', CheckRecruiterAuth, frontController.rec_my_account)
route.get('/rec_job_details/:job_id', CheckRecruiterAuth, frontController.rec_job_details)

route.get('/logout', frontController.logout)

route.post('/empinsert', frontController.empinsert)
route.post('/recinsert', frontController.recinsert)
route.post('/verifylogin', frontController.verifylogin)
route.post('/decideuser', frontController.decideuser)
route.post('/addjobs', CheckRecruiterAuth, frontController.addjobs)
route.post('/editprofileemp', CheckEmployeeAuth, frontController.editprofileemp)
route.post('/editprofilerec', CheckRecruiterAuth, frontController.editprofilerec)
route.post('/changepassemp', CheckEmployeeAuth, frontController.changepassemp)
route.post('/changepassrec', CheckRecruiterAuth, frontController.changepassrec)
route.post('/deleteemp', CheckEmployeeAuth, frontController.deleteemp)
route.post('/deleterec', CheckRecruiterAuth, frontController.deleterec)
route.post('/editdetailsemp', CheckEmployeeAuth, frontController.editdetailsemp)
route.post('/editdetailsrec', CheckRecruiterAuth, frontController.editdetailsrec)

route.post('/applierstatusupdate', CheckRecruiterAuth, frontController.applierstatusupdate)
route.get('/applierdelete/:app_id', CheckRecruiterAuth, frontController.applierdelete)
route.get('/applyjob/:job_id', CheckEmployeeAuth, frontController.applyjob)

route.post('/editjob/:id', CheckRecruiterAuth, frontController.editjob)
route.get('/deletejob/:id', CheckRecruiterAuth, frontController.deletejob)



module.exports = route