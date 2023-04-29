const mysql = require('mysql')
require('dotenv').config()

connection = mysql.createConnection({
    // host: process.env.DB_HOST,
    // user: process.env.DB_USER,
    // password: process.env.DB_PASS,
    // database: process.env.DB,
    host: 'localhost',
    user: 'root',
    password: '110163',
    database: 'day7',

})

module.exports = connection