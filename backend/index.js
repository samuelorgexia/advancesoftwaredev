const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

app.use(express.static("../frontend/build"));

app.listen(port, () => {
  console.log(`ASD app listening on ${port}`);
});
