const express = require("express");
const router = express.Router();

const properties = require("./services/Properties.js");

router.use("/properties", properties);

module.exports = router;
