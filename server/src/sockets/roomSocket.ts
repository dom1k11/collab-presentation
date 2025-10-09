import { Server, Socket } from "socket.io";

type Slide = { id: string; content: string };
const rooms = ["Task 1", "Web", "C#"];
const roomSlides: Record<string, Slide[]> = {};

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

    socket.on("add-slide", ({ roomId, slide }: { roomId: string; slide: Slide }) => {
      if (!rooms.includes(roomId)) return;
      if (!roomSlides[roomId]) roomSlides[roomId] = [];
      roomSlides[roomId].push(slide);
      io.to(roomId).emit("room-update", roomSlides[roomId]);
      console.log(`➕ Added new slide in ${roomId}: ${slide.id}`);
    });

    socket.on(
      "slide-update",
      ({ roomId, id, content }: { roomId: string; id: string; content: string }) => {
        const slides = roomSlides[roomId];
        if (!slides) return;
        const updated = slides.map((s) => (s.id === id ? { ...s, content } : s));
        roomSlides[roomId] = updated;
        socket.to(roomId).emit("slide-updated", { id, content });
      }
    );

    socket.on("disconnect", () => {
      console.log("🔴 Disconnected:", socket.id);
    });
  });
}
