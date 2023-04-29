const express = require('express')
const { authRouter } = require('./routes/auth.js')
const userRoute = require('./routes/users.js')
const app = express()
const port = 3000
const jsonwebtoken = require('jsonwebtoken')
var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.use('/users', userRoute)
app.use('/auth', authRouter)


app.listen(port, () => {
    console.log(`listening at port ${port}`);
})