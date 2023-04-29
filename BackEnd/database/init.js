const connection = require('./connection')
// connection.query('create database day3', (err, result) => {
//     console.log(err);
//     console.log(result);
// })


// connection.query(`create table Users(id INT AUTO_INCREMENT, fullname NVARCHAR(244) NOT NULL, age INT, CHECK (age > 0), gender BOOLEAN default true, PRIMARY KEY(id))`, (err, result) => {
//     console.log(err);
//     console.log(result);
// })


connection.query(`insert into Users(username, name, password, salt, email, age, gender) values ('tuong123', Nguyen Huy Tuong, true), ('Nguyen Thi Tuong', 21, false)`, (err, result) => {
    console.log("insert done !");
    console.log(err);
    console.log(result);
})





