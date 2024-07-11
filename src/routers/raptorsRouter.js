import express from "express";

// TODO: Import the functions from the controller file
import { getAllRaptors, addRaptors } from "../controllers/raptorsController.js";

export const raptorsRouter = express.Router();

raptorsRouter.route("/").get(getAllRaptors).post(addRaptors);
/*  
  .delete(deleteAllRaptors); */

raptorsRouter.route("/:id");
/*   .get(getRaptorById)
  .patch(updateRaptorById)
  .delete(deleteRaptorById); */
