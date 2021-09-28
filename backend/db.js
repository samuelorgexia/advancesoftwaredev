const mysql = require("mysql");
const dbconfig=require("./db.config");
const fs = require(`fs`);
const mysqlA = require(`mysql-await`);
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
   
    // create tables
    const role =`
    CREATE TABLE IF NOT EXISTS  role 
    (role_id SERIAL,
      role_name VARCHAR(40),
      PRIMARY KEY(role_id)
      )
    `;
    const userRole= `
    CREATE TABLE IF NOT EXISTS user_role 
    (user_role_id SERIAL,
     user_id INT,
     role_id INT,
     PRIMARY KEY(user_role_id)


      )`;
  
    const user = `
    CREATE TABLE IF NOT EXISTS user
     (user_id SERIAL,
       first_name VARCHAR(40),
        last_name VARCHAR(40),
        user_role_id INT,
        password VARCHAR(255),
        email VARCHAR(255),
        user_type VARCHAR(40),
        PRIMARY KEY (user_id)
        )`;
      
       
         connection.query(role, function (err, result) {
          if (err) throw err;
          console.log("role Table created");
        });
        
       
    connection.query(user, function (err, result) {
      if (err) throw err;
      console.log("user Table created");
    });
    
    
    connection.query(userRole, function (err, result) {
      if (err) throw err;
      console.log("user role Table created");
    });
    // insert role data 
    const getRoles=`SELECT * FROM role`;
    connection.query(getRoles,function(err,results){
      if(err)throw err;
      const data=JSON.parse(JSON.stringify(results.length));
      if(data!=3){
        const roles=["user","admin","agent"];
        const insert=`INSERT INTO role (role_name) VALUES(?)`;
        for(var i=0; i<roles.length; i++){
          connection.query(insert,[roles[i]]);
        }
      }
    });
    
    
    
  });


 
 
  
  module.exports = connection;