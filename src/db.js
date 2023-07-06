const mysql = require('mysql');


const con = mysql.createPool({
    connectionLimit: 100,
    host: 'localhost',
    user: 'root',
    password: 'ROOT123',
    database: 'utn'
});

con.getConnection((err, connection) =>{
    if (err) throw err;
    console.log("bd conectada exitosamente " + connection.threadId);
})

module.exports = con;
