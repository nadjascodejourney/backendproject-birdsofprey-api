import { Falconry } from "../models/falconryModel.js";

import { falconryZValidation } from "../utils/falconryZValidation.js";

export const getAllFalconries = async (req, res, next) => {
  try {
    const falconries = await Falconry.find();
    res.status(200).json(falconries);
  } catch (error) {
    next(error);
  }
};

export const addFalconry = async (req, res, next) => {
  try {
    const validatedFalconryData = falconryZValidation.parse(req.body);

    const newFalconry = new Falconry(validatedFalconryData);
    await newFalconry.save(); // create or save, both are valid methods to save a new document to the database
    res.status(201).json(newFalconry);
  } catch (error) {
    console.error("Error creating Falconry:", error); // Log any errors encountered

    next(error);
  }
};
