import { createServer } from "http";
import { Server } from "socket.io";
import app from "../app";
import { registerSockets } from "../sockets";
import { PORT, CORS_ORIGIN } from "../config/env";

export function createAppServer() {
  const httpServer = createServer(app);

  const io = new Server(httpServer, {
    cors: { origin: CORS_ORIGIN },
  });

  registerSockets(io);

  return httpServer;
}
