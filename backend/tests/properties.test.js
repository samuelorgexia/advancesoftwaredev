//const connection = require("../db.js");
const propertyData = require("../core/PropertyData.json");

const handlePropertyResp = (property_sql) => {
  const {
    property_id,
    title,
    price,
    reserve_price,
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
    reservePrice: reserve_price,
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
    auctionLive: !!auction_live,
    //auctionTime: auction_date_time,
    auctionCompleted: auction_completed
      ? {
          date: auction_completed_date_time,
        }
      : false,
  };
};

describe("retrieving properties", () => {
  it("should test that true === true", () => {
    expect(true).toBe(true);
  });

  /*beforeAll((done) => {
    setTimeout(done, 4900); //hacky way to wait for connection until we
    //setup pool connections to mysql
  });

  test("retrieve 1 property", (done) => {
    const propertyId = 1;

    new Promise((res, rej) =>
      connection.query(
        `SELECT * FROM properties WHERE property_id = ${propertyId}`,
        (err, response) => (err ? rej(err) : res(response))
      )
    )
      .then((result) => {
        expect(result.length).toBe(1);
        expect(propertyData[propertyId]).toEqual(handlePropertyResp(result[0]));

        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("retrieve all properties at certain coords", (done) => {
    const coords = {
      lat: -33.813897,
      long: 151.083898,
    };

    const radius = 5; //5km

    const sql = `SELECT *,
    (6371 * acos( cos( radians(${coords.lat}) ) * cos( radians( coords_lat ) ) 
   * cos( radians( coords_long ) - radians(${coords.long}) ) + sin( radians(${coords.lat}) ) * sin(radians(coords_lat)) ) ) AS distance
   FROM properties
   HAVING distance < ${radius}
   ORDER BY distance`;

    new Promise((res, rej) =>
      connection.query(sql, (err, response) => (err ? rej(err) : res(response)))
    )
      .then((result) => {
        result.map(handlePropertyResp).forEach((property) => {
          expect(propertyData[property.id]).toEqual(property);
        });

        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("test parramatta coords should only give one property (5km radius)", (done) => {
    const coords = {
      lat: -33.812177,
      long: 151.009161,
    };

    const radius = 5; //5km

    const sql = `SELECT *,
      (6371 * acos( cos( radians(${coords.lat}) ) * cos( radians( coords_lat ) ) 
     * cos( radians( coords_long ) - radians(${coords.long}) ) + sin( radians(${coords.lat}) ) * sin(radians(coords_lat)) ) ) AS distance
     FROM properties
     HAVING distance < ${radius}
     ORDER BY distance`;

    new Promise((res, rej) =>
      connection.query(sql, (err, response) => (err ? rej(err) : res(response)))
    )
      .then((result) => {
        expect(result.length).toBe(1);

        result.map(handlePropertyResp).forEach((property) => {
          expect(propertyData[property.id]).toEqual(property);
        });

        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("different country coords - no results (5km radius)", (done) => {
    const coords = {
      lat: 53.428097,
      long: -1.362856,
    };

    const radius = 5; //5km

    const sql = `SELECT *,
      (6371 * acos( cos( radians(${coords.lat}) ) * cos( radians( coords_lat ) ) 
     * cos( radians( coords_long ) - radians(${coords.long}) ) + sin( radians(${coords.lat}) ) * sin(radians(coords_lat)) ) ) AS distance
     FROM properties
     HAVING distance < ${radius}
     ORDER BY distance`;

    new Promise((res, rej) =>
      connection.query(sql, (err, response) => (err ? rej(err) : res(response)))
    )
      .then((result) => {
        expect(result.length).toBe(0);

        done();
      })
      .catch((err) => {
        done(err);
      });
  });*/
});
