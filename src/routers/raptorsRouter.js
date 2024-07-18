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

import { accessTokenCheck } from "../utils/accessTokenCheck.js";
import { roleCheck } from "../utils/roleCheck.js";

export const raptorsRouter = express.Router();

raptorsRouter
  .route("/")
  .get(getAllRaptors)
  .post(accessTokenCheck, roleCheck(["falconer", "admin"]), addRaptor);

raptorsRouter
  .route("/:id")
  .get(getRaptorById)
  .delete(accessTokenCheck, roleCheck("admin"), deleteRaptorById)
  .patch(accessTokenCheck, roleCheck("admin"), updateRaptorById);

/* raptorsRouter.route("/batch").post(addMultipleRaptors);*/
