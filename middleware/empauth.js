const jwt = require('jsonwebtoken')
const EmployeeModal = require('../models/Employee')

const CheckEmployeeAuth = async(req, res, next) => {
    const {token} = req.cookies
    if(!token){
        req.flash('error', 'Unauthorized user, Please Login!!')
        return res.redirect('/')
    } else {
        const verify_token = jwt.verify(token, 'Mehar Patel')
        const data = await EmployeeModal.findOne({_id : verify_token.id})
        req.employee = data
        next()
    }
}

module.exports = CheckEmployeeAuth