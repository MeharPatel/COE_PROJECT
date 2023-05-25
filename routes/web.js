const express = require('express')
const frontController = require('../controllers/frontController')
const route = express.Router()

//router
route.get('/', frontController.login)
route.get('/reg1', frontController.reg1)
route.get('/reg2', frontController.reg2)
route.get('/home', frontController.home)
route.get('/jobs', frontController.jobs)
route.get('/my_account', frontController.my_account)
route.get('/job_details', frontController.job_details)
route.get('/logout', frontController.logout)

module.exports = route