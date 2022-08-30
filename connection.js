const mysql = require("mysql");

const con = mysql.createConnection({

    host: "localhost",
    user: "root",
    password: "password",
    database: "youtube",
    port:3306,
    socketPath: '/var/run/mysqld/mysqld.sock'
});

con.connect((err) => {
    if(err) throw err;
    console.log("Connection created..");

});

module.exports.con= con;