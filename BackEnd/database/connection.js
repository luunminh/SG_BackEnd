const mysql = require('mysql')


connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '110163',
    database: 'day3',
})

module.exports = connection