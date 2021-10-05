const express = require("express");
const router = express.Router();

router.get("/get-property/:propertyId", (req, res) => {
  const { propertyId } = req.params;

  //get property details from property id
});

router.post("/list-properties", (req, res) => {
  const { filterType, limit, page, coords, radius } = req.body;

  //just do coords, do filter later (specific filters). filter mostly using the same technique in the frontend bc why not
});

module.exports = router;
