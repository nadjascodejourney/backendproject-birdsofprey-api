import path from "path";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./src/config/connectDB.js";
import errorMiddleware from "./src/middleware/errorMiddleware.js";

dotenv.config();

const SERVER_PORT = process.env.SERVER_PORT || 5000;

const DB_URL = process.env.MONGO_URI;

const app = express();

app.use(cors());

app.get("/error", (req, res, next) => {
  const error = new Error("Test error");
  next(error);
});

app.use(express.json());

app.use(errorMiddleware);

const startServer = async () => {
  try {
    app.listen(SERVER_PORT, () => {
      console.log(`Server is running on port ${SERVER_PORT}`);
    });
  } catch (error) {
    throw new Error(`Error starting server: ${error}`);
  }
};

connectDB(DB_URL).then(() => startServer());
