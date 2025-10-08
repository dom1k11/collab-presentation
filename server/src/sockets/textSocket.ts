import { Server, Socket } from "socket.io";

export function registerTextSocket(io: Server) {
  io.on("connection", (socket: Socket) => {
    console.log("🟢 User connected:", socket.id);

    socket.on("text-change", (newText) => {
      console.log("📩", newText);
      socket.broadcast.emit("text-update", newText);
    });

    socket.on("disconnect", () => {
      console.log("🔴 Disconnected:", socket.id);
    });
  });
}
