const express = require("express");
const app = express();
const cors = require("cors"); 
const http = require("http");
const { Server } = require("socket.io");
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

// const port = process.env.PORT || 5000;

// const routes = require("./routes.js");

// app.use(express.static("../frontend/build"));

// app.listen(port, () => {
//   console.log(`ASD app listening on ${port}`);
// });

//listening to event 
io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });
  
  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data)
  });

  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
  })
});

server.listen(3001, () => {
  console.log("Server Running")
})


