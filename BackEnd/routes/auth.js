const express = require('express');
const authRouter = express.Router();
const jsonwebtoken = require('jsonwebtoken')
const { userValidation } = require('../middleware/validation')
const connection = require('../database/connection');
const { hashPassword, comparePassword } = require('../helpers/hash');
const { getOne, create, executeQuery, getMany } = require('../database/query')
const { mailService } = require('../services/mail.service')
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

authRouter.post('/forgot-password', async (req, res) => {
    const { email } = req.query

    const user = await getOne({
        db: connection,
        query: "SELECT * FROM users where email =?",
        params: email
    })

    if (!user) {
        return res.status(400).json({
            message: "This email doesn't exist !!!",
        });
    }

    const token = "123tacungthoitatnen"
    const isSuccess = await create({
        db: connection,
        query: "UPDATE users set passwordResetToken =?, passwordResetExpiration=? where email=?",
        params: [token, new Date(Date.now() + 10 * 60 * 1000), email]
    })

    if (isSuccess) {
        const sendEmail = {
            emailFrom: "nhatminh16009@gmail.com",
            // emailTo: email,
            emailTo: "batchap58@gmail.com",
            emailSubject: `Token to reset email : ${token}`,
            emailText: 'Token to reset your password'
        }
        await mailService.sendEmail({ ...sendEmail })

        return res.sendStatus(204).json({
            message: "Send success!!!"
        })

    } else {
        return res.sendStatus(400)
    }



})


// reset password via email
authRouter.post('/reset-password', async (req, res) => {
    const {
        email,
        token,
        newpassword
    } = req.body

    const user = await getOne({
        db,
        query: 'SELECT * FROM users WHERE email = ? AND passwordResetToken = ? AND passwordResetExpiration >= ?',
        params: [email, passwordResetToken, new Date(Date.now())],
    });

    if (!user) {
        return res.status(400).json({
            message: "Error !!!",
        });
    }

    

    return res.status(200).json({
        message: 'success',
    });
})




module.exports = { authRouter, secret };