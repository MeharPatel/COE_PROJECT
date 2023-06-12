const express = require('express')
const app = express()
const web = require('./routes/web')
const port = 3000
const connectdb = require('./DB/connectdb')

const fileUpload = require('express-fileupload')
//Temp file_uploader
app.use(fileUpload({useTempFiles: true}))

//cookies
const cookieParser = require('cookie-parser')
app.use(cookieParser())

//connect flash and session
const session = require('express-session')
const flash = require('connect-flash')

app.use(session({
  secret: 'secret',
  cookie: {maxAge: 60000 },
  resave: false,
  saveUninitiatlized: false,
}))

app.use(flash());

app.use(express.urlencoded({extended : true}))

//connectdb
connectdb()

//ejs set
app.set('view engine', 'ejs')

//static files
app.use(express.static('public'))

//route
app.use('/',web)

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})