import express from "express";

import {
  getAllFalconries,
  addFalconry,
  getFalconryById,
  updateFalcontrById,
  deleteFalconryById,
  completeUpdateById,
} from "../controllers/falconriesController.js";

import { accessTokenCheck } from "../utils/accessTokenCheck.js";
import { roleCheck } from "../utils/roleCheck.js";

export const falconryRouter = express.Router();

falconryRouter
  .route("/")
  .get(getAllFalconries)
  .post(accessTokenCheck, roleCheck("falconer"), addFalconry); // accessTokenCheck is a middleware function that checks if the user has a valid access token to access the route and post a new falconry

falconryRouter
  .route("/:id")
  .get(getFalconryById)
  .patch(accessTokenCheck, updateFalcontrById)
  .delete(accessTokenCheck, roleCheck("admin"), deleteFalconryById)
  .put(accessTokenCheck, completeUpdateById);
