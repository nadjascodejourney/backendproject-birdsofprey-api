import { Raptor } from "../models/raptorModel.js";

export const getAllRaptors = async (req, res, next) => {
  try {
    const raptors = await Raptor.find();
    res.status(200).json(raptors);
  } catch (error) {
    next(error);
  }
};

export const addRaptor = async (req, res, next) => {
  try {
    const raptors = await Raptor.create(req.body);
    res.status(201).json(raptors);
  } catch (error) {
    next(error);
  }
};

/* 
export const addMultipleRaptors = async (req, res, next) => {
  try {
    const raptors = await Raptor.insertMany(req.body);
    res.status(201).json(raptors);
  } catch (error) {
    next(error);
  }
}; */

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

export const updateRaptorById = async (req, res, next) => {
  try {
    const raptor = await Raptor.findByIdAndUpdate(req.params.id, req.body, {
      // req.params.id is the id from the URL, req.body is the data from the request body
      runValidators: true, // run the validators on the update operation; validators are defined in the schema
    });
    raptor
      ? res.status(200).json(raptor)
      : res.status(404).json({ message: "Raptor not found" });
  } catch (error) {
    next(error);
  }
};

export const deleteRaptorById = async (req, res, next) => {
  try {
    const raptor = await Raptor.findByIdAndDelete(req.params.id);
    raptor
      ? res.status(200).json(raptor)
      : res.status(404).json({ message: "Raptor not found" });
  } catch (error) {
    next(error);
  }
};
