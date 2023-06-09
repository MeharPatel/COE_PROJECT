const mongoose = require('mongoose')
const url = "mongodb://0.0.0.0:27017/COE_Project"

const connectdb = () => {
    return mongoose.connect(url)
    .then(() => {
        console.log("Connected Successfully")
    })
    .catch((err) => {
        console.log(err)
    })
}

module.exports = connectdb