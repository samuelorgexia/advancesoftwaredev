const express = require("express");
const app = express();
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

const routes = require("./routes.js");
const mysql = require("mysql");
const dbconfig = require("./db.config");

app.use(express.static("../frontend/build"));

app.use('/api', routes);

const connection = mysql.createConnection({
  host: dbconfig.host,
  user: dbconfig.user,
  password: dbconfig.password,
  database: dbconfig.database,
});

const registerBidHandler = require("./handlers/bidHandler");

const onConnection = (socket)=> {
  registerBidHandler(io, socket);
}

io.on("connection", onConnection);


server.listen(port, () => {
  console.log(`ASD app listening on ${port}`);
});
