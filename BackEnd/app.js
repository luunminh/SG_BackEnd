const express = require('express')
const app = express()
const port = 3000
// const userRoute = require('./routes/users.js')
const jsonwebtoken = require('jsonwebtoken')
var bodyParser = require('body-parser')


app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
const secret = 'sewy'

const userDB = [
    {
        username: 'minhluu',
        age: 21,
        password: '123456'
    },
    {
        username: 'toan',
        password: '123456',
        age: 12,

    }
]

// const jwt = jsonwebtoken.sign(user, secret, {
//     algorithm: 'HS256'
// })
// console.log({ jwt });

app.post('/auth/login', (req, res) => {
    const username = req.body.username
    // const {
    //     username,
    //     password
    // } = req.body
    const targetUser = userDB.find(user => user.username === username)

    if (targetUser.password === password) {
        // const jwt = 
    }


    res.json({ targetUser })
})

app.get('/users/:id/balance', (req, res) => {
    const authorization = req.headers.authorization;
    const token = authorization.substring(7)

    console.log({ token })
})



app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())



// app.use('/users', userRoute)
// app.use('/students', studentRoute)



app.listen(port, () => {
    console.log(`listening at port ${port}`);
})