const express = require('express')
const crypto = require('crypto')
const app = express()
const port = 3000
// const userRoute = require('./routes/users.js')
const jsonwebtoken = require('jsonwebtoken')
var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// const {privateKey, publicKey} = crypto.generateKeyPairSync()

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
    const password = req.body.password

    const targetUser = userDB.find(user => user.username === username)

    if (!targetUser) {
        return res.status(400).json({
            message: 'User not found',
        });
    }

    if (targetUser.password === password) {
        const jwt = jsonwebtoken.sign({
            username: targetUser.username,
            password: targetUser.email,
            age: targetUser.age
        }, secret, {
            algorithm: 'HS256',
            expiresIn: '1h'
        })

        return res.status(200).json({
            data: jwt,
            message: 'Login success',
        });
    }


    return res.status(401).json({
        message: 'Invalid credentials'
    })
})

app.get('/balance', (req, res) => {
    const username = req.query.username;

    const authorization = req.headers.authorization;
    const token = authorization.substring(7)

    try {
        const isTokenValid = jsonwebtoken.verify(token, secret)

        if (isTokenValid.username == username) {
            const user = dbs.find(u => u.username === username);

            return res.status(200).json({
                balance: user.balance,
            });
        }
    } catch (error) {
        return res.status(401).json({
            message: error.message,
        });
    }
})


// app.use('/users', userRoute)
// app.use('/students', studentRoute)



app.listen(port, () => {
    console.log(`listening at port ${port}`);
})