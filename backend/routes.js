const express = require("express");
const router = express.Router();
const properties = require("./services/properties.js");
const auctionController = require("./controllers/auctionsController");

router.use("/properties", properties);

router.use("/auction/:id", auctionController.show);

module.exports = router;
