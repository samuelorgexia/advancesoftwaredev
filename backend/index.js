const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
const http = require("http");
const path = require("path");

const server = http.createServer(app);
const user = require("./user");
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const routes = require("./routes.js");

const db = require("./db");
const registerBidHandler = require("./handlers/bidHandler");

// middleware
const corsOptions = {
  origin: "http://localhost:5000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "build")));

app.use("/api", routes);
app.use("/user", user);

app.get("*", (req, res) => {
  console.log(path.join(__dirname + "/build/index.html"));
  res.sendFile(path.join(__dirname + "/build/index.html"));
});

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
