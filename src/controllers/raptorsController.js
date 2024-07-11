import { Raptor } from "../models/raptorModel.js";

export const getAllRaptors = async (req, res, next) => {
  try {
    const raptors = await Raptor.find();
    res.status(200).json(raptors);
  } catch (error) {
    next(error);
  }
};
