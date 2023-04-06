const express = require('express')
const app = express()
const port = 3000
const userRoute = require('./routes/users.js')
var bodyParser = require('body-parser')

// config de nhan gia tri tu client gui len thong qua body
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())


app.use('/users', userRoute)

app.listen(port, () => {
    console.log(`listening at port ${port}`);
})