const crypto = require('crypto')

const hashPassword = (input) => {
    const salt = crypto.randomBytes(16).toString('hex')
    const hashedPassword = crypto.pbkdf2Sync(input, salt, 1000, 64, 'sha1').toString('hex')
    return {
        salt,
        hashedPassword,

    }
}


const comparePassword = (hashPassword, salt, rawPassword) => {
    const hashedRawPassword = crypto.pbkdf2Sync(
        rawPassword,
        salt,
        1000,
        64,
        'sha1'
    ).toString('hex')
    return hashPassword === hashedRawPassword
}

module.exports = {
    hashPassword,
    comparePassword
}