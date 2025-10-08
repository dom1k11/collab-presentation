import { Server } from "socket.io";
import { registerTextSocket } from "./textSocket";

export function registerSockets(io: Server) {
  registerTextSocket(io);
}
