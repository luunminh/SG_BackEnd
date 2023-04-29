
const userValidation = (req, res, next) => {
    const { username, password, age } = req.body
    if (username.length <= 2 || password.length <= 2) {
        return res.sendStatus(400)
    }
    if (!(Number.parseInt(age) > 0)) {
        return res.sendStatus(400)
    }
    next()
}

const updateUserValidation = (req, res, next) => {
    const { name, age, gender } = req.body
    const str = "1234567890~`!@#$%^&*()_-+={[}]|;:<,>.?/|"
    if (name.trim().length < 1 || str.includes(name)) {
        console.log("aaa");
        return res.sendStatus(400).json({
            message: "Invalid property"
        })
    }
    if (!Number.parseInt(age) || Number.parseInt(age) < 1) {
        console.log("bbb");
        return res.sendStatus(400).json({
            message: "Invalid property"
        })
    }
    if (gender !== true && gender != false) {
        console.log("ccc");
        return res.sendStatus(400).json({
            message: "Invalid property"
        })
    }


    next()
}

module.exports = { updateUserValidation, userValidation }

