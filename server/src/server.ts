import express, { Express, Request, Response } from "express";

const app: Express = express();
const port: Number = 8000; // Change to be in dotenv

app.get("/", (req: Request, res: Response) => {
  res.send("Express TypeScript Server Works!");
});

app.listen(port, () => {
  console.log(`[Server]: I am running at http://localhost:${port}`);
});
