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
    const newFalconry = new Falconry(validatedFalconryData); // create a new document with the request body
    await newFalconry.save();
    res.status(201).json(newFalconry);
  } catch (error) {
    console.error("Error creating Falconry:", error); // Log any errors encountered
    next(error);
  }
};

export const getFalconryById = async (req, res, next) => {
  try {
    const falconry = await Falconry.findById(req.params.id);
    falconry
      ? res.status(200).json(falconry)
      : res.status(404).json({ message: "Falconry not found" });
  } catch (error) {
    next(error);
  }
};

export const updateFalcontrById = async (req, res, next) => {
  try {
    const validatedFalconryData = falconryZValidation.parse(req.body);
    const falconry = await Falconry.findByIdAndUpdate(
      req.params.id,
      validatedFalconryData,
      {
        runValidators: true,
        new: true,
      }
    );
    falconry
      ? res.status(200).json(falconry)
      : res.status(404).json({ message: "Falconry not found" });
  } catch (error) {
    next(error);
  }
};

// hard delete
export const deleteFalconryById = async (req, res, next) => {
  try {
    const falconry = await Falconry.findByIdAndDelete(req.params.id);
    falconry
      ? res.status(200).json(falconry)
      : res.status(404).json({ message: "Falconry not found" });
  } catch (error) {
    next(error);
  }
};
