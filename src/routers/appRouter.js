import express from "express";

// TODO: import all the Router files

import { birdsRouter } from "./birdsRouter.js";
import { observationRouter } from "./observationRouter.js";
import { falconriesRouter } from "./falconriesRouter.js";

export const appRouter = express.Router();

appRouter.use("/birds", birdsRouter);
appRouter.use("/observations", observationRouter);
appRouter.use("/falconries", falconriesRouter);
