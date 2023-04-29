
const userValidation = (req, res, next) => {
    const { username, password, age } = req.body
    if (username.length <= 2 || password.length <= 2) {
        res.sendStatus(400)
    }
    if (!(Number.parseInt(age) > 0)) {
        res.sendStatus(400)
    }
    next()
}

const updateUserValidation = (req, res, next) => {
    const { name, age, gender } = req.body
    const str = "1234567890~`!@#$%^&*()_-+={[}]|;:<,>.?/|"
    if (name.trim().length < 1 || str.includes(name)) {
        res.sendStatus(400)
    }
    if (!Number.parseInt(age) || Number.parseInt(age) < 1) {
        res.sendStatus(400)
    }
    if (gender !== "true" && gender !== "false") {
        res.sendStatus(400)
    }


    next()
}

module.exports = { updateUserValidation, userValidation }

