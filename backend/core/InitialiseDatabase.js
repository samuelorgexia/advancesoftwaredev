const db = require("../db.js");

const initDB = async () => {
  console.log("Starting init db...");

  try {
    //await db.createQuery("CREATE DATABASE asd");

    await db.createQuery(`CREAT TABLE properties ()`);
  } catch (e) {
    console.error(e);
  }
};

initDB();
