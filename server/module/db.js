var mysql = require('mysql');

var db = mysql.createConnection({
    host: 'mearie-user.cgjictz2gicj.ap-southeast-1.rds.amazonaws.com',
    port: '3306',
    user: 'admin',
    password: '!2345678', 
    database: 'mearie_user',
});

db.connect();

module.exports = db;