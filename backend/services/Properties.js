const express = require("express");
const router = express.Router();

router.get("/get-property/:propertyId", (req, res) => {
  const { propertyId } = req.params;
});

router.post("/list-properties", (req, res) => {
  const { filterType, limit, page, coords, radius } = req.body;
});

module.exports = router;
