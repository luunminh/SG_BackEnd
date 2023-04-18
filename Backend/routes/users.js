const express = require('express');
var bodyParser = require('body-parser')
const userRouter = express.Router();
const validation = require("./middleware/validation.js");

let users = [
    {
        "id": 1,
        "fullname": "Nguyen Huy Tuong",
        "age": 18
    },
    {
        "id": 2,
        "fullname": "Nguyen Thi Tuong",
        "age": 15
    }
]




userRouter.get('/', (req, res) => {
    res.status(200).send(users)
    // console.log(res.status)
})

userRouter.get(`/:id`, (req, res) => {
    const id = req.params.id
    const user = users.filter(item => item.id === Number.parseInt(id))
    res.status(204).send(user)
    // console.log(res.status)
})

// update
userRouter.put('/user/:id', (req, res) => {
    const id = Number.parseInt(req.params.id)
    const fullname = req.body.fullname
    const age = Number.parseInt(req.body.age)
    users = users.map(item => (item.id === Number.parseInt(id)) ? { id, fullname, age } : item)
    res.status(204).json("204 (No content)");
})


//add
userRouter.post('/user', validation, (req, res) => {
    const id = users[users.length - 1].id + 1
    const fullname = req.body.fullname
    const age = Number.parseInt(req.body.age)
    users.push({ id, fullname, age })
    res.status(201).json("201 (Created)");
})

userRouter.delete('/user/:id', (req, res) => {
    const id = Number.parseInt(req.params.id)
    users = users.filter(item => item.id !== Number.parseInt(id))
    res.status(204).json("204 (No content)");

})



module.exports = userRouter;