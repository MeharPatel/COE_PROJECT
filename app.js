const express = require('express')
const app = express()
const web = require('./routes/web')
const port = 3000

//ejs set
app.set('view engine', 'ejs')

//static files
app.use(express.static('public'))

//route
app.use('/',web)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})