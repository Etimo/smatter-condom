import dotenv from "dotenv";
import express from "express";
import { connectDb } from "./configuration/mongo";
import { createPostRoutes, createUserRoutes } from "./controllers";

const app = express();
const port = 3001;

dotenv.config();

connectDb(process.env.MONGO_DB_CONNECTION_STRING ?? "");

app.use("/users", createUserRoutes());
app.use("/posts", createPostRoutes());

app.listen(port, () => {
  console.log(`Api listening on port ${port}`);
});
