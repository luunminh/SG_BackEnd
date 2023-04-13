const mysql = require('mysql')


connection = mysql.createConnection({
    // host: '192.168.1.48',
    host: 'localhost',
    user: 'root',
    password: '110163',
    database: 'day3',
})

module.exports = connection