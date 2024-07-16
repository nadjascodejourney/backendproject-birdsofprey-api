import mongoose from "mongoose";
import { Schema } from "mongoose";

const raptorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      lowercase: true, // lowercase: boolean, whether to always call .toLowerCase() on the value
      required: true,
      unique: true,
      trim: true,
    },
    scientific_name: {
      type: String, // type is a special property in Mongoose schemas. When Mongoose finds a nested property named type in your schema, Mongoose assumes that it needs to define a SchemaType with the given type; type: { type: String } would be a workaround to store something as an object with a type property
      lowercase: true,
      required: true,
      unique: true,
      trim: true,
    },
    family: {
      type: String,
      lowercase: true,
      required: true,
      trim: true,
    },
    genus: {
      type: String,
      lowercase: true,
      required: true,
      trim: true,
    },
    nesting_habitat: {
      type: [String], // [String] is an array of strings; every value will be added to the array
      lowercase: true,
      trim: true,
    },
    prey_type: {
      type: [String],
      lowercase: true,
      trim: true,
    },
    continents: {
      type: [String],
      lowercase: true,
      required: true,
      trim: true,
    },
    conservation_status: {
      type: String,
      lowercase: true,
      required: true,
      enum: [
        "data deficient",
        "least concern",
        "near threatened",
        "vulnerable",
        "endangered",
        "critically endangered",
      ], // IUCN Red List categories
    },
    habitat_type: {
      type: [String],
      lowercase: true,
      trim: true,
    },
    associated_falconries: {
      type: [{ type: Schema.Types.ObjectId, ref: "Falconry" }],
      lowercase: true,
      trim: true,
    },
    wing_span_cm: {
      type: Number,
    },
    migration_distance_km: {
      type: Number,
    },
    average_lifespan_years: {
      type: Number,
      min: 3,
      max: 65,
    },
    weight_gr: {
      type: Number,
    },
  }, // timestamps must be outside of the object as a second argument; now mongoose can create the timestamps createdAt and updatedAt
  {
    timestamps: true,
  }
);

export const Raptor = mongoose.model("Raptor", raptorSchema);

Raptor.find()
  .findOne({ _id: "668ff4129b80fb86bec076d7" })
  .populate("associated_falconries")
  .then((entries) => console.log(entries))
  .catch((error) => console.log(error));
