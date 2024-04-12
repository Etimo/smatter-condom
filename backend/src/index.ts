import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { connectDb } from "./configuration/mongo";
import { createPostRoutes, createUserRoutes } from "./controllers";
import { authMiddleWare } from "./middleware/auth-middleware";
import { contextMiddleWare } from "./middleware/context-middleware";
import { errorMiddleware } from "./middleware/error-middleware";

const app = express();
const port = 3001;

dotenv.config();

app.use(express.json());
connectDb(process.env.MONGO_DB_CONNECTION_STRING ?? "");

// https://expressjs.com/en/resources/middleware/cors.html
app.use(
  cors({
    origin: "http://localhost:5173",
    allowedHeaders: ["cookie", "content-type"],
    exposedHeaders: "*",
    credentials: true,
    preflightContinue: true,
    methods: "OPTIONS,GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);
app.use(contextMiddleWare());
app.use(authMiddleWare());

app.use("/users", createUserRoutes());
app.use("/posts", createPostRoutes());

app.listen(port, () => {
  console.log(`Api listening on port ${port}`);
});

app.use(errorMiddleware());
