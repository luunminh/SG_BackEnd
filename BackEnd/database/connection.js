const mysql = require('mysql')
require('dotenv').config({ path: '../.env' })
// console.log(process.env.DB_HOST);
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
console.log(connection);

module.exports = { connection }