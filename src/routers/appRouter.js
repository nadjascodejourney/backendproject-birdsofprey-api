import express from "express";

// TODO: import all the Router files

import { raptorsRouter } from "./raptorsRouter.js";
/* 
import { falconriesRouter } from "./falconriesRouter.js";
import { observationRouter } from "./observationRouter.js";

 */
export const appRouter = express.Router();

appRouter.use("/raptors", raptorsRouter);

/* 
appRouter.use("/falconries", falconriesRouter); 
appRouter.use("/observations", observationRouter);
*/
