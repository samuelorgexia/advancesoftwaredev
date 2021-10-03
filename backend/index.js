const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

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

io.on('connection', (socket) => {
  console.log('a user connected');
});

server.listen(port, () => {
  console.log(`ASD app listening on ${port}`);
});
