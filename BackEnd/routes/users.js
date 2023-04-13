const express = require('express');
const userRouter = express.Router();
const connection = require('../database/connection')

let users = []
connection.query('SELECT * from Users', (err, rs) => {
    users = JSON.parse(JSON.stringify(rs))
    console.log(users);
})


// middleware
function validate(req, res, next) {
    if ((req.body.fullname).length > 0 && (Number.parseInt(req.body.age)) && Boolean(req.body.gender)) {
        next()
    } else {
        res.sendStatus(400)
    }
}


userRouter.get('/', (req, res) => {
    connection.query('SELECT * from Users', (err, rs) => {
        users = JSON.parse(JSON.stringify(rs))
        console.log(users);
    })
    res.sendStatus(200)
    // res.sendStatus(200).json(users)
})

userRouter.get(`/:id`, (req, res) => {
    const id = req.params.id
    connection.query(`SELECT * from Users where id='${id}'`, (err, rs) => {
        let user = JSON.parse(JSON.stringify(rs))
        console.log(user);
        users = [...users, user]
    })
    res.sendStatus(200).json(users)

})

// update
userRouter.put('/user/:id', (req, res) => {
    const id = Number.parseInt(req.params.id)
    const fullname = req.body.fullname
    const age = Number.parseInt(req.body.age)
    const gender = Boolean(req.body.gender)
    connection.query(`UPDATE Users SET fullname ='${fullname}', age=${age}, gender=${gender} WHERE id=${id}`, (err, rs) => {
        console.log(err);
        console.log(rs);
    })
    users = users.map(item => (item.id === Number.parseInt(id)) ? { id, fullname, age, gender } : item)
    res.sendStatus(204)
    res.json(users)
})


//add
userRouter.post('/user', validate, (req, res) => {
    const id = users[users.length - 1].id + 1
    const fullname = req.body.fullname
    const age = Number.parseInt(req.body.age)
    const gender = Boolean(req.body.gender)
    console.log({ fullname, age, gender });
    connection.query(`insert into Users(fullname, age, gender) values ('${fullname}', ${age}, ${gender})`, (err, rs) => {
        console.log(err);
        console.log(rs);
        users = [...users, { id, fullname, age, gender }]
    })
    res.sendStatus(201)
})

// del
userRouter.delete('/user/:id', (req, res) => {
    const id = Number.parseInt(req.params.id)
    connection.query(`DELETE FROM Users WHERE id=${id}`, (err, rs) => {
        console.log(rs);
    })
    users = users.filter(item => item.id !== Number.parseInt(id))
    res.sendStatus(204)
})



module.exports = userRouter;