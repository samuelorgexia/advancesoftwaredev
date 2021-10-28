const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
const http = require("http");
const server = http.createServer(app);
const user =require('./user');
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "https://auctionify.azurewebsites.net/",
    methods: ["GET", "POST"],
  },
});

const routes = require("./routes.js");
app.use(express.static("../frontend/build"));
const db = require("./db");
const registerBidHandler = require('./handlers/bidHandler');

const whitelist = [
  "https://auctionify.azurewebsites.net",
  "http://localhost:5000",
];
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log(`Origin - ${origin}`);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

// middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", routes);
app.use("/user",user);
io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  registerBidHandler(io, socket);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
  });
});

server.listen(port, () => {
  console.log(`ASD app listening on ${port}`);
});
