import { Falconry } from "../models/falconryModel.js";

import {
  falconryZValidation,
  falconryPartialZValidation,
} from "../utils/falconryZValidation.js";

// GET ALL
export const getAllFalconries = async (req, res, next) => {
  try {
    const falconries = await Falconry.find();
    res.status(200).json(falconries);
  } catch (error) {
    next(error);
  }
};

// POST
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

// GET SINGLE
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

// PATCH
export const updateFalcontrById = async (req, res, next) => {
  try {
    const validatedFalconryData = falconryPartialZValidation.parse(req.body); // validate and parse the incoming data with parse() from zod

    /*     const validationResult = falconryPartialZValidation.safeParse(req.body); // Now check for validation errors with safeParse() contains additional information about the validationprocess and potential errors (success: true or false)
    if (!validationResult.success) {
      return res.status(400).json(validationResult.error.errors);
    } */

    const falconry = await Falconry.findByIdAndUpdate(
      req.params.id,
      { $set: validatedFalconryData },
      {
        runValidators: true,
        new: true,
      }
    ).populate("raptors");

    falconry
      ? res.status(200).json(falconry)
      : res.status(404).json({ message: "Falconry not found" });
  } catch (error) {
    next(error);
  }
};

// PUT
export const completeUpdateById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const validationResult = falconryZValidation.safeParse(req.body);

    if (!validationResult.success) {
      return res.status(400).json(validationResult.error.errors);
    }

    const updatedFalconry = await Falconry.findByIdAndUpdate(
      id,
      validationResult.data,
      { new: true }
    ).populate("raptors");

    if (!updatedFalconry) {
      return res.status(404).json({ message: "Falconry not found" });
    }

    res.status(200).json(updatedFalconry);
  } catch (error) {
    next(error);
  }
};

// hard DELETE
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
