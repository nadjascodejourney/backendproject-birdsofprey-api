import express from "express";

// TODO: Import the functions from the controller file

export const observationRouter = express.Router();

observationRouter
  .route("/")
  .get(getAllObservations)
  .post(addObservation)
  .delete(deleteAllObservations);

observationRouter
  .route("/:id")
  .get(getObservationById)
  .patch(updateObservationById)
  .delete(deleteObservationById);
