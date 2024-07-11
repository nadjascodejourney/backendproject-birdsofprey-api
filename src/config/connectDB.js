import mongoose from "mongoose";

export const connectDB = async (url) => {
  try {
    return mongoose.connect(url); // return is important, because we are using this function in the server.js file; mongoose.connect() is a promise, so we can use .then() in the server.js file.
  } catch (error) {
    process.exit(1); // if the connection fails, we want to stop the server from running
  }
};
