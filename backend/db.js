const mysql = require("mysql");
const dbconfig=require("./db.config");

const connection = mysql.createConnection({
    host: dbconfig.host,
    user: dbconfig.user,
    password: dbconfig.password,
    database: dbconfig.database
  });

  // open the MySQL connection
connection.connect(error => {
    if (error) throw error;
    console.log("Successfully connected to the database.");
   
  /*
  var set =
     "CREATE TABLE set (setname VARCHAR(255), picture VARCHAR(255), setID INT)";
  connection.query(set, function (err, result) {
    if (err) throw err;
    console.log("Ticket Table created");
  });
  */
  });
  
  module.exports = connection;