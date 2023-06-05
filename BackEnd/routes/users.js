const express = require('express');
const jsonwebtoken = require('jsonwebtoken')
const userRouter = express.Router();
const { updateUserValidation, userValidation, authenticate } = require("../middleware/validation");
const connection = require("../database/connection")
const { getOne, create, executeQuery, getMany } = require('../database/query')




userRouter.post("/create", authenticate, userValidation, async (req, res) => {
    const existedUsername = await connection
        .select()
        .from("users")
        .where("username", req.body.username)
        .first();
    if (!existedUsername) {
        const { salt, hashedPassword } = hashPassword(req.body.password);
        user = {
            username: req.body.username,
            password: hashedPassword,
            email: req.body.email,
            gender: req.body.gender,
            name: req.body.name,
            age: parseInt(req.body.age),
            salt: salt,
            createAt: new Date(Date.now()),
            createBy: req.user.id,
            isAdmin: req.body.isAdmin,
        };
        await connection.insert(user).into("users");
        return res.status(201).json({ message: "created successful" });
    }
    return res.status(200).json({ message: "Username already exists" });
});



// update
userRouter.put('/user/:id', authenticate, async (req, res) => {
    await connection("users").where("id", req.params.id).update({
        name: req.body.name,
        age: req.body.age,
        gender: req.body.gender,
        isAdmin: req.body.isAdmin,
    });
    return res.status(200).json({ message: "update successful" });
})

//delete
userRouter.delete("/:id", authenticate, async (req, res) => {
    await connection("users").where("id", req.params.id).del();
    return res.status(200).json({ message: "delete successful" });
});



// pagination | search by name
userRouter.get("/filter-users", async (req, res) => {
    let page_size = req.query.page_size,
        page_index = req.query.page_index,
        name = req.body.name ? req.body.name : null;
    const condition = (builder) => {
        if (name) {
            builder.where("name", "like", `%${name}%`);
        }
    };
    let pagination = {};
    if (page_index < 1) page_index = 1;
    let offset = (page_index - 1) * page_size;
    return Promise.all([
        connection.count("* as count").from("users").where(condition).first(),
        connection.select("*").from("users").where(condition).offset(offset).limit(page_size),
    ]).then(([total, rows]) => {
        let count = total.count;
        let rows = rows;
        pagination.total = count;
        pagination.per_page = page_size;
        pagination.offset = offset;
        pagination.to = offset + rows.length;
        pagination.last_page = Math.ceil(count / page_size);
        pagination.current_page = page_index;
        pagination.from = offset;
        pagination.data = rows;
        res.status(200).json({ message: pagination });
    });
});



module.exports = userRouter;