const mysql = require("mysql2");

const db = mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    user: "root",
    password: "280894",
    database: "storedb"
}).promise();

module.exports = db;