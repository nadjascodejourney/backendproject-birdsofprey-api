import mongoose from "mongoose";
import { Schema } from "mongoose";

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
  raptors: [{ type: Schema.Types.ObjectId, ref: "Raptor" }], // populate
};

const falconrySchema = new mongoose.Schema(falconrySchemaFields, {
  timestamps: true,
});

export const Falconry = mongoose.model("Falconry", falconrySchema);

// To test
/* Falconry.find()
  .findOne({ _id: "669514227a9e593fc579db23" })
  .populate("raptors")
  .then((entries) => console.log(entries))
  .catch((error) => console.log(error));
 */
