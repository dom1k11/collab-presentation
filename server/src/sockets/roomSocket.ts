import { Server, Socket } from "socket.io";

const rooms = ["Task 1", "Web", "C#"];

const roomSlides: Record<string, string[]> = {};

export function registerRoomSocket(io: Server) {
  io.on("connection", (socket: Socket) => {
    console.log("🟢 Connected:", socket.id);

    socket.emit(
      "rooms-list",
      rooms.map((id) => ({ id, title: id }))
    );

    socket.on("get-rooms", () => {
      socket.emit(
        "rooms-list",
        rooms.map((id) => ({ id, title: id }))
      );
    });

    socket.on("join-room", (roomId: string) => {
      if (!rooms.includes(roomId)) {
        socket.emit("error", "❌ Room not found");
        return;
      }
      socket.join(roomId);
      console.log(`📂 ${socket.id} joined room: ${roomId}`);

      if (!roomSlides[roomId]) roomSlides[roomId] = [];

      socket.emit("room-update", roomSlides[roomId]);
    });

    socket.on(
      "room-change",
      ({ roomId, content }: { roomId: string; content: string[] }) => {
        if (!rooms.includes(roomId)) return;
        roomSlides[roomId] = content;
        console.log(`📝 Updated ${roomId}:`, content);
        socket.to(roomId).emit("room-update", content);
      }
    );

    socket.on("disconnect", () => {
      console.log("🔴 Disconnected:", socket.id);
    });
  });
}
