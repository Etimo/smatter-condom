import dotenv from "dotenv";
import express from "express";
import { createUserRoutes } from "./controllers/user-controller";

const app = express();
const port = 3001;

dotenv.config();

app.use("/users", createUserRoutes());

app.listen(port, () => {
  console.log(`Api listening on port ${port}`);
});
