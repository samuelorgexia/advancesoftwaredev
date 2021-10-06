const mysql = require("mysql");
const dbconfig = require("./db.config");
const fs = require(`fs`);
const mysqlA = require(`mysql-await`);
const connection = mysql.createConnection({
  host: dbconfig.host,
  user: dbconfig.user,
  password: dbconfig.password,
  database: dbconfig.database,
});

// open the MySQL connection
connection.connect((error) => {
  if (error) throw error;
  console.log("Successfully connected to the database.");

  // create tables
  const role = `
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

  const realestate = `
       CREATE TABLE IF NOT EXISTS auctioner 
       (auction_id SERIAL, 
        real_estate_company VARCHAR(255),
        PRIMARY KEY (auction_id)
        )ENGINE=INNODB
       `;

  // we can refer to the auction_id as a foreign key and run joins but nothings been done for it so I'll just
  // store auction data in the properties table for now
  const properties = `
       CREATE TABLE IF NOT EXISTS properties 
       (property_id SERIAL, 
        title VARCHAR(255),
        price VARCHAR(255),
        address VARCHAR(255),
        suburb VARCHAR(255),
        state VARCHAR(255),
        postcode VARCHAR(255),
        description VARCHAR(255),
        features_bed INT(255),
        features_bath INT(255),
        features_car INT(255),
        coords_long DECIMAL(10,10),
        coords_lat DECIMAL(10,10),
        property_size FLOAT(24),
        auctioneer VARCHAR(255),
        auction_location VARCHAR(255),
        images VARCHAR(255),
        auction_live BOOL,
        auction_completed BOOL,
        auction_date_time INT(255),
        PRIMARY KEY (property_id)
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

  connection.query(realestate, function (err, result) {
    if (err) throw err;
    console.log("auctioner table created");
  });

  connection.query(properties, function (err, result) {
    if (err) throw err;
    console.log("properties table created");
  });

  // insert role data
  const getRoles = `SELECT * FROM role`;
  connection.query(getRoles, function (err, results) {
    if (err) throw err;
    const data = JSON.parse(JSON.stringify(results.length));
    if (data != 3) {
      const roles = ["user", "admin", "agent"];
      const insert = `INSERT INTO role (role_name) VALUES(?)`;
      for (var i = 0; i < roles.length; i++) {
        connection.query(insert, [roles[i]]);
      }
    }
  });
});

module.exports = connection;
