const express = require('express')
const frontController = require('../controllers/frontController')
const route = express.Router()

//router
route.get('/', frontController.login)
route.get('/reg1', frontController.reg1)
route.get('/reg_emp', frontController.reg_emp)
route.get('/reg_rec', frontController.reg_rec)
route.get('/home', frontController.home)
route.get('/jobs', frontController.jobs)
route.get('/rec_jobs', frontController.rec_jobs)
route.get('/my_account', frontController.my_account)
route.get('/job_details', frontController.job_details)
route.get('/logout', frontController.logout)

route.post('/empinsert', frontController.empinsert)
route.post('/recinsert', frontController.recinsert)
route.post('/decideuser', frontController.decideuser)
route.post('/addjobs', frontController.addjobs)

module.exports = route