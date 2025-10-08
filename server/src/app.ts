import express from "express";
import cors from "cors";

import PingRoute from "./routes/ping";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/ping", PingRoute);

export default app;
