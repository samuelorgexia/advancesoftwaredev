const express = require("express");
const router = express.Router();

const properties = require("./services/Properties.js");
const user = require("./user");

router.use("/properties", properties);
router.use("/user", user);

module.exports = router;
