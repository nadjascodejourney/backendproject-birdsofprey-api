import express from "express";

// TODO: import all the Router files
import { raptorsRouter } from "./raptorsRouter.js";
import { falconryRouter } from "./falconryRouter.js";
import { userRouter } from "./userRouter.js";

export const appRouter = express.Router();

appRouter.use("/raptors", raptorsRouter);
appRouter.use("/falconries", falconryRouter);

appRouter.use("/user", userRouter); // by grouping all user-related routes under /user, I can centralize the handling of user data and actions. Also you can quickly identify where to add new user-related routes or modify existing ones.
