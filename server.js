import path from "path"; // path is a core module in Node.js, use it for working with file and directory paths, i.e.: to get the path to the current file
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

// custom
import { connectDB } from "./src/config/connectDB.js";
import errorMiddleware from "./src/middleware/errorMiddleware.js";
import { appRouter } from "./src/routers/appRouter.js";

dotenv.config(); // loads environment variables from a .env file into process.env

const SERVER_PORT = process.env.SERVER_PORT || 5000;

const DB_URL = process.env.MONGO_URI;

const app = express();

app.use(express.json()); // must be before the appRouter, otherwise the request body will be undefined in the HTTP POST request
app.use(cors());

app.use("/", appRouter); // the path / uses the appRouter function from the appRouter.js file

app.use(errorMiddleware);

const startServer = async () => {
  try {
    app.listen(SERVER_PORT, () => {
      console.log(`Server is running on port ${SERVER_PORT}` + " 🦅");
    });
  } catch (error) {
    throw new Error(`Error starting server: ${error}`);
  }
};

connectDB(DB_URL).then(() => startServer());
