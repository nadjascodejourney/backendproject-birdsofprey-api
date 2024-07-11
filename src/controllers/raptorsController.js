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
    const raptors = await Raptors.create(req.body);
    res.status(201).json(raptors);
  } catch (error) {
    next(error);
  }
};
