import express from "express";

// TODO: import all the Router files

import { raptorsRouter } from "./raptorsRouter.js";
/* 
import { observationRouter } from "./observationRouter.js";
import { falconriesRouter } from "./falconriesRouter.js";
 */
export const appRouter = express.Router();

appRouter.use("/raptors", raptorsRouter);

/* 
appRouter.use("/observations", observationRouter);
appRouter.use("/falconries", falconriesRouter); 
*/
