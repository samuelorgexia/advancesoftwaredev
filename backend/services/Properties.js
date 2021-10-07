const express = require("express");
const router = express.Router();

const connection = require("../db.js");

router.get("/get-property/:propertyId", async (req, res) => {
  const { propertyId } = req.params;

  try {
    const result = await new Promise((res, rej) =>
      connection.query(
        `SELECT * FROM properties WHERE property_id = ${propertyId}`,
        (err, response) => (err ? rej(err) : res(response))
      )
    );

    if (result.length !== 1) throw new Error("Response mismatch");
    res.send(handlePropertyResp(result[0]));
  } catch (e) {
    console.error("Could not fetch property ID: " + propertyId);
    console.error(e);
  }
});

router.post("/list-properties", async (req, res) => {
  const { coords, radius } = req.body;

  const defaultRadius = 5; //5km

  /**
   *
   * smaller response keys
   *
   * property_id, title, address, suburb, state, postcode,
  description, features_bed, features_bath, features_car,
  coords_long, coords_lat, thumbnail, auction_live, 
  auction_completed, auction_date_time,
   *
   */

  const sql = `SELECT *,
   (6371 * acos( cos( radians(${coords.lat}) ) * cos( radians( coords_lat ) ) 
  * cos( radians( coords_long ) - radians(${coords.long}) ) + sin( radians(${
    coords.lat
  }) ) * sin(radians(coords_lat)) ) ) AS distance
  FROM properties
  HAVING distance < ${radius || defaultRadius}
  ORDER BY distance`;

  //console.log(sql);

  try {
    const result = await new Promise((res, rej) =>
      connection.query(sql, (err, response) => (err ? rej(err) : res(response)))
    );

    res.send(result.map(handlePropertyResp));
  } catch (e) {
    console.error("Could not do get properties from db.");
    console.error(e);
    res.sendStatus(500);
  }
});

const handlePropertyResp = (property_sql) => {
  const {
    property_id,
    title,
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
    auction_date_time,
  } = property_sql;

  return {
    id: property_id,
    title,
    price,
    address,
    suburb,
    state,
    postcode,
    description,
    features:
      features_bed || features_bath || features_car
        ? {
            bed: features_bed || null,
            bath: features_bath || null,
            car: features_car || null,
          }
        : null,
    coords: {
      lat: coords_lat,
      long: coords_long,
    },
    size: property_size,
    agent,
    auctioneer,
    auctionLocation: auction_location,
    thumbnail,
    image: images ? images.split(",") : null,
    auctionLive: auction_live,
    auctionTime: auction_date_time,
    auctionCompleted: auction_completed
      ? {
          date: auction_completed_date_time,
        }
      : false,
  };
};

module.exports = router;
