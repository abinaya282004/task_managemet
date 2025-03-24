const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost", 
  user: "root", 
  password: "Abi@12345", 
  database: "task_management", 
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
    return;
  }
  console.log("MySQL Connected!");
});

module.exports = db;
