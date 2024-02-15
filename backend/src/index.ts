import dotenv from "dotenv";
import express, { Request, Response } from "express";

const app = express();
const port = 3001;

dotenv.config();
//console.log("STARTING UP! ",process.env);

app.get("/", (req: Request, res: Response) => {
  console.log("req", req);
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
