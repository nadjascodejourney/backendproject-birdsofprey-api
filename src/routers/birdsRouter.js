import express from "express";

// TODO: Import the functions from the controller file

export const birdsRouter = express.Router();

birdsRouter.route("/").get(getAllBirds).post(addBird).delete(deleteAllBirds);

birdsRouter
  .route("/:id")
  .get(getBirdById)
  .patch(updateBirdById)
  .delete(deleteBirdById);
