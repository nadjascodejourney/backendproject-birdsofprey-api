import { Raptor } from "../models/raptorModel.js";

export const getAllRaptors = async (req, res, next) => {
  try {
    const raptors = await Raptor.find();
    res.status(200).json(raptors);
  } catch (error) {
    next(error);
  }
};

export const addRaptors = async (req, res, next) => {
  try {
    const raptors = await Raptor.create(req.body);
    res.status(201).json(raptors);
  } catch (error) {
    next(error);
  }
};

export const getRaptorById = async (req, res, next) => {
  try {
    const raptor = await Raptor.findById(req.params.id); // req.params.id is the id from the URL
    raptor
      ? res.status(200).json(raptor)
      : res.status(404).json({ message: "Raptor not found" });
  } catch (error) {
    next(error);
  }
};
