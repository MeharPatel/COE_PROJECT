const express = require('express')
const app = express()
const web = require('./routes/web')
const port = 3000
const connectdb = require('./DB/connectdb')

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