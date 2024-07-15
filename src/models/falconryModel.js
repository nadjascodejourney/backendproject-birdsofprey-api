import mongoose from "mongoose";

const falconrySchemaFields = {
  falconry_name: { type: String, required: true },
  falconry_address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
  },
  numberOfRaptors: { type: Number, required: true },
  falconry_email: { type: String, required: true },
  // TODO populate raptors
};

const falconrySchema = new mongoose.Schema(falconrySchemaFields);

export const Falconry = mongoose.model("Falconry", falconrySchema);
