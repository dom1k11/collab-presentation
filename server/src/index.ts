
import { createAppServer } from "./sockets/server";
import { PORT } from "./config/env";

const httpServer = createAppServer();

httpServer.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
