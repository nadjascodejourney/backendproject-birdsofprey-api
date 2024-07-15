import express from "express";

import {
  getAllFalconries,
  addFalconry,
  getFalconryById,
  updateFalcontrById,
  deleteFalconryById,
} from "../controllers/falconriesController.js";

export const falconryRouter = express.Router();

falconryRouter.route("/").get(getAllFalconries).post(addFalconry);

falconryRouter
  .route("/:id")
  .get(getFalconryById)
  .patch(updateFalcontrById)
  .delete(deleteFalconryById);
