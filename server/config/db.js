const mysql = require("mysql");

const db = mysql.createConnection({
    host: "https://mearie-user.cgjictz2gicj.ap-southeast-1.rds.amazonaws.com",
    user: "admin",
    password: "!2345678",
    database: "mearie_user",
});

db.connect();

module.exports = db;