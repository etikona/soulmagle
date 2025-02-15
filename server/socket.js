export const setupSockets = (io) => {
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);
    socket.on("join-room", (roomId) => socket.join(roomId));
    socket.on("send-message", (data) =>
      io.to(data.room).emit("receive-message", data)
    );
  });
};
