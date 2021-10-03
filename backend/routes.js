const express = require("express");
const router = express.Router();
const properties = require("./services/Properties.js");
const AuctionController = require("./controllers/AuctionsController");

router.use("/properties", properties);

router.use("/auction/:id", AuctionController.show);

module.exports = router;
