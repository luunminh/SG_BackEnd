const express = require('express');
const authRouter = express.Router();
const jsonwebtoken = require('jsonwebtoken')
const { userValidation } = require('../middleware/validation')
const connection = require('../database/connection');
const { hashPassword, comparePassword } = require('../helpers/hash');
const { getOne, create, executeQuery, getMany } = require('../database/query')

const secret = "sewy"

authRouter.post('/register', userValidation, async (req, res) => {
    const {
        username,
        password,
        name,
        gender,
        age,
        email
    } = req.body;



    // check if username is exist
    const user = await getOne({
        db: connection,
        query: "SELECT * FROM users where username =?",
        params: username
    })

    if (user) {
        return res.status(400).json({
            message: 'User already exist!!!',
        });
    }

    const { salt, hashedPassword } = hashPassword(password)



    await executeQuery({
        db: connection,
        query: `insert into users(username, name, password, salt, email, age, gender) values ( ?, ?, ?, ?, ?, ?, ? )`,
        params: [username, name, hashedPassword, salt, email, age, gender]
    })


    const jwt = jsonwebtoken.sign({
        username,
        name,
        password: hashedPassword,
        salt,
        email,
        age,
        gender
    }, secret)


    return res.status(200).json({
        data: jwt,
        message: 'Login success',
    });

})

authRouter.post('/login', async (req, res) => {
    const { username } = req.body
    const hashPass = req.body.password

    const user = await getOne({
        db: connection,
        query: "SELECT * FROM users WHERE username = ?",
        params: [username],
    })


    if (!user) {
        return res.status(400).json({
            message: 'Username not found',
        });
    }

    const { salt, password } = user
    console.log({ salt, password, hashPass });
    console.log(comparePassword(password, salt, hashPass));
    if (!comparePassword(password, salt, hashPass)) {
        return res.status(400).json({
            message: 'Your password is not correct!!!',
        });
    }

    const jwt = jsonwebtoken.sign({
        ...user
    }, secret)

    return res.status(200).json({
        data: jwt,
        message: 'Login success',
    });
})


module.exports = { authRouter, secret };