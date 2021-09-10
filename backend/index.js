const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

const routes = require("./routes.js");

//const db=('./db');

app.use(express.static("../frontend/build"));
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
  const set =
     "CREATE TABLE users (user_id INT, First_Name VARCHAR(255), Last_Name VARCHAR(255),User_Role VARCHAR(255),Password VARCHAR(255),Email VARCHAR(255))";
  connection.query(set, function (err, result) {
    if (err) throw err;
    console.log("Ticket Table created");
  });
  */
  });
app.listen(port, () => {
  console.log(`ASD app listening on ${port}`);
});
