import { Server } from "socket.io";
import { registerTextSocket } from "./textSocket";
import { registerRoomSocket } from "./roomSocket";

export function registerSockets(io: Server) {
  registerTextSocket(io);
  registerRoomSocket(io);
}
