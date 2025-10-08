import type { Request, Response } from "express";

export function controller(
  handler: (req: Request, res: Response) => Promise<void>,
  name = "unnamed"
) {
  return async function (req: Request, res: Response) {
    try {
      await handler(req, res);
    } catch (err) {
      console.error(`Controller error ${name}`, err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
}
