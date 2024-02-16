import dotenv from "dotenv";
import express from "express";
import { connectDb } from "./configuration/mongo";
import { createUserRoutes } from "./controllers/users/controller";

const app = express();
const port = 3001;

dotenv.config();

connectDb(process.env.MONGO_DB_CONNECTION_STRING ?? "");

app.use("/users", createUserRoutes());

app.listen(port, () => {
  console.log(`Api listening on port ${port}`);
});
