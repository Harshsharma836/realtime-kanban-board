require("dotenv").config();
const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const connectDB = require("./config/db");
const taskRoutes = require("./routes/taskRoutes");

connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/tasks", taskRoutes);

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" },
});

io.on("connection", (socket) => {
  console.log("🟢 Client connected:", socket.id);

  socket.on("taskChanged", () => {
    console.log("🟡 taskChanged event received from:", socket.id);
    socket.broadcast.emit("boardUpdated");
    console.log("🔵 boardUpdated event sent to other clients");
  });

  socket.on("disconnect", () => {
    console.log("🔴 Client disconnected:", socket.id);
  });
});


server.listen(5000, () => {
  console.log("Server running on 5000");
});

module.exports = app;
