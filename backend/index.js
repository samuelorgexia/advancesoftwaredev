const express = require("express");
const app = express();
const cors=require('cors');
const port = process.env.PORT || 5000;
const routes = require("./routes.js");
const user =require('./user');
app.use(express.static("../frontend/build"));
const db=require('./db');

// middleware
const corsOptions ={
  origin:'http://localhost:5000', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200,
}
app.use(cors(corsOptions)); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/user",user);




app.listen(port, () => {
  console.log(`ASD app listening on ${port}`);
});
