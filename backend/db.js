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
      )ENGINE=INNODB
    `;

    const user = `
    CREATE TABLE IF NOT EXISTS user
    (user_id SERIAL,
      first_name VARCHAR(40),
       last_name VARCHAR(40),
       role VARCHAR(40),
       password VARCHAR(255),
       email VARCHAR(255),
       user_type INT,
       PRIMARY KEY (user_id)
       )ENGINE=INNODB`;

       const realestate =`
       CREATE TABLE IF NOT EXISTS auctioner 
       (auction_id SERIAL, 
        real_estate_company VARCHAR(255),
        PRIMARY KEY (auction_id)
        )ENGINE=INNODB
       `;
      
       
         connection.query(role, function (err, result) {
          if (err) throw err;
          console.log("role Table created");
        });
        
       
    connection.query(user, function (err, result) {
      if (err) throw err;
      console.log("user Table created");
    });

    connection.query(realestate,function(err,result){
      if(err) throw err;
      console.log("auctioner table created");
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