module.exports = (io) => {
  io.on("connection", (socket) => {
    socket.on("taskUpdated", () => {
      socket.broadcast.emit("refreshBoard");
    });
  });
};
