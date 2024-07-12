import express from "express";

// TODO: Import the functions from the controller file
import {
  getAllRaptors,
  addRaptors,
  getRaptorById,
} from "../controllers/raptorsController.js";

export const raptorsRouter = express.Router();

raptorsRouter.route("/").get(getAllRaptors).post(addRaptors);
/*  .delete(deleteAllRaptors); */

raptorsRouter.route("/:id").get(getRaptorById);

/*   .get(getRaptorById)
  .patch(updateRaptorById)
  .delete(deleteRaptorById); */
