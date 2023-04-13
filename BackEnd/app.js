const express = require('express')
const app = express()
const port = 3000
const userRoute = require('./routes/users.js')
var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())




app.use('/users', userRoute)

app.listen(port, () => {
    console.log(`listening at port ${port}`);
})