var mysql = require('mysql');
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'api',
    port: 3001
});

module.exports = db;