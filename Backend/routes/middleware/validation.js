// middleware
function validation(req, res, next) {
    const nums = /^\d+$/
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if (!specialChars.test(req.body.fullname) && (Number.parseInt(req.body.age)) && !nums.test(req.body.fullname)) {
        next()
    } else {
        res.sendStatus(400)
    }
}

module.exports = validation;