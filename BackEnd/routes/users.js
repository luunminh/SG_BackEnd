const express = require('express');
const jsonwebtoken = require('jsonwebtoken')
const userRouter = express.Router();
const { updateUserValidation } = require("../middleware/validation");
const connection = require("../database/connection")
const { getOne, create, executeQuery, getMany } = require('../database/query')
const { secret } = require("./auth.js")

userRouter.get('/', async (req, res) => {
    const users = await getMany({
        db: connection,
        query: "SELECT * FROM users;",
        params: []
    })
    console.log(users)
    res.sendStatus(200).json(users)
})

userRouter.get(`/:id`, async (req, res) => {
    const id = req.params.id
    const user = await getOne({
        db: connection,
        query: "SELECT * FROM users where id=?",
        params: [id]
    })
    console.log(user)
    res.sendStatus(200).json(user)

})

// update
userRouter.put('/user/:id', updateUserValidation, async (req, res) => {
    const {
        name,
        gender,
        age,
    } = req.body;
    const id = req.params.id

    try {
        const authorization = req.headers.authorization;
        const token = authorization.substring(7)
        const isValidToken = jsonwebtoken.verify(token, secret)
        if (isValidToken.id == id) {
            const isSuccess = await create({
                db: connection,
                query: "UPDATE users set name=?, age=?, gender=? where id=?",
                params: [name, age, gender, id]
            })
            console.log({ isSuccess });
            if (isSuccess) {
                return res.sendStatus(204).json({
                    message: "Update successfully"
                })

            } else {
                return res.sendStatus(400)
            }

        }
    } catch (err) {
        console.log({ err });
        return res.status(401).json({
            message: err.message,
        });

    }
})




module.exports = userRouter;