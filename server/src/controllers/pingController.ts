import { controller } from "../utils/controllerWrapper";

export const handlePing = controller(async (_req, res) => {
  res.json("Hello world");
});
