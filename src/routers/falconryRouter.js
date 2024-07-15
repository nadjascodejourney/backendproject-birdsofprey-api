import express from "express";

import {
  getAllFalconries,
  addFalconry,
} from "../controllers/falconriesController.js";

export const falconryRouter = express.Router();

falconryRouter.route("/").get(getAllFalconries).post(addFalconry);
