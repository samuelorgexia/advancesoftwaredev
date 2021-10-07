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

const PropertyData = require("./core/PropertyData.json");

// open the MySQL connection
connection.connect((error) => {
  if (error) throw error;
  console.log("Successfully connected to the database.");


  // open the MySQL connection
connection.connect(error => {
    if (error) throw error;
    console.log("Successfully connected to the database.");
   connection.query("CREATE DATABASE IF NOT EXISTS asd", function (err, result) {
    if (err) throw err;
    console.log("Asd Database created");
  });
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
        coords_long DECIMAL(65,30),
        coords_lat DECIMAL(65,30),
        property_size FLOAT(24),
        agent VARCHAR(255),
        auctioneer VARCHAR(255),
        auction_location VARCHAR(255),
        thumbnail TEXT,
        images TEXT,
        auction_live BOOL,
        auction_completed BOOL,
        auction_completed_date_time BIGINT(255),
        auction_date_time BIGINT(255),
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

    console.log("Adding properties...");

    const properties = Object.values(PropertyData);

    const now = Date.now();

    const inMins = (min) => now + 1000 * 60 * min;
    const inHours = (hours) => now + 1000 * 60 * 60 * hours;

    const auctionTimes = [
      inMins(0),
      inMins(1),
      inMins(1),
      inMins(13),
      inMins(56),
      inHours(3),
    ];

    const sql = `REPLACE INTO properties (property_id, title,
    price,
    address,
    suburb,
    state,
    postcode,
    description,
    features_bed,
    features_bath,
    features_car,
    coords_long,
    coords_lat,
    property_size,
    agent,
    auctioneer,
    auction_location,
    thumbnail,
    images,
    auction_live,
    auction_completed,
    auction_completed_date_time,
    auction_date_time) VALUES ?`;

    const values = properties.map((property, index) => {
      return [
        property.id,
        property.title,
        property.price,
        property.address,
        property.suburb,
        property.state,
        property.postcode,
        property.description,
        property.features.bed,
        property.features.bath,
        property.features.car,
        property.coords.long,
        property.coords.lat,
        property.size,
        property.agent,
        property.auctioneer,
        property.auctionLocation,
        property.thumbnail || "",
        property.image ? property.image.join(",") : "",
        property.auctionLive,
        !!property.auctionCompleted,
        property.auctionCompleted ? property.auctionCompleted.date : null,
        auctionTimes[index] || now,
      ];
    });

    connection.query(sql, [values], (err, result) => {
      console.log("prepopulated/updated properties table");
    });
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
