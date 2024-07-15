import express from "express";

// TODO: Import the functions from the controller file
import {
  getAllRaptors,
  addRaptor,
  getRaptorById,
  updateRaptorById,
  deleteRaptorById,
  /* addMultipleRaptors, */
} from "../controllers/raptorsController.js";

export const raptorsRouter = express.Router();

raptorsRouter.route("/").get(getAllRaptors).post(addRaptor);

raptorsRouter
  .route("/:id")
  .get(getRaptorById)
  .delete(deleteRaptorById)
  .patch(updateRaptorById);

/* raptorsRouter.route("/batch").post(addMultipleRaptors);*/
