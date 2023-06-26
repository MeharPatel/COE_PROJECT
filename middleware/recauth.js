const jwt = require('jsonwebtoken')
const RecruiterModal = require('../models/Recruiter')

const CheckRecruiterAuth = async(req, res, next) => {
    const {token} = req.cookies
    if(!token){
        req.flash('error', 'Unauthorized user, Please Login!!')
        return res.redirect('/')
    } else {
        const verify_token = jwt.verify(token, 'Mehar Patel')
        const data = await RecruiterModal.findOne({_id : verify_token.id})
        req.recruiter = data
        next()
    }
}

module.exports = CheckRecruiterAuth