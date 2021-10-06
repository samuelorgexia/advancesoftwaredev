const express = require("express");
const app = express();
const cors=require('cors');
const port = process.env.PORT || 5000;
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});
const mysql = require("mysql");
const dbconfig = require("./db.config");
const registerBidHandler = require("./handlers/bidHandler");
const routes = require("./routes.js");
const user =require('./user');
const corsOptions ={
  origin:'http://localhost:5000', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200,
}

app.use(express.static("../frontend/build"));

app.use('/api', routes);

app.use(express.static("../frontend/build"));

const connection = mysql.createConnection({
  host: dbconfig.host,
  user: dbconfig.user,
  password: dbconfig.password,
  database: dbconfig.database,
});

app.use(cors(corsOptions)); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/user",user);

const onConnection = (socket) => {
  registerBidHandler(io, socket);
}

io.on("connection", onConnection);

server.listen(port, () => {
  console.log(`ASD app listening on ${port}`);
});
