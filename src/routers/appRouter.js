import express from "express";

// TODO: import all the Router files

import { raptorsRouter } from "./raptorsRouter.js";

import { falconryRouter } from "./falconryRouter.js";

export const appRouter = express.Router();

appRouter.use("/raptors", raptorsRouter);

appRouter.use("/falconries", falconryRouter);
