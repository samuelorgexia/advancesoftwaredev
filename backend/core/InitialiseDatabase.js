const connection = require("../db.js");
const PropertyData = require("./PropertyData.json");

const addProperties = async () => {
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

  try {
    //await db.createQuery("CREATE DATABASE asd");

    const sql = `INSERT INTO properties (title,
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
      console.log(property.agent);
      return [
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

    const result = await new Promise((res) =>
      connection.query(sql, [values], res)
    );

    console.log(result);

    console.log("DONE");
  } catch (e) {
    console.error(e);
  }
};

const getProperties = async () => {};

setTimeout(addProperties, 3000); //this is a hacky way of waiting for the db to connect.
//we should use createPool instead for the sql connection then call getConnection on each call to the db.
