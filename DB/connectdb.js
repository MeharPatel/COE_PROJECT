const mongoose = require('mongoose')
const url = "mongodb://0.0.0.0:27017/COE_Project"
const liveUrl = 'mongodb+srv://meharpatel2512:C6mWpTwsox0SJike@cluster0.1myrfay.mongodb.net/Jobex?retryWrites=true&w=majority'


const connectdb = () => {
    return mongoose.connect(liveUrl)
    .then(() => {
        console.log("Connected Successfully")
    })
    .catch((err) => {
        console.log(err)
    })
}

module.exports = connectdb