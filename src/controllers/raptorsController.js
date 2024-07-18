import { Raptor } from "../models/raptorModel.js";

export const getAllRaptors = async (req, res, next) => {
  try {
    const raptors = await Raptor.find()
      .populate("associated_falconries")
      .exec(); // exec is used to execute the query from the populate method; it is a promise that resolves to the populated document
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
      // req.params.id is the id from the URL, req.body is data from request body
      runValidators: true, // run validators on the update operation; validators are defined in the schema
      new: true, // return the modified document rather than the original
    });
    raptor
      ? res.status(200).json(raptor)
      : res.status(404).json({ message: "Raptor not found" });
  } catch (error) {
    next(error);
  }
};

//hard delete
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
