import mongoose from "mongoose";

const raptorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      lowercase: true, // lowercase: boolean, whether to always call .toLowerCase() on the value
      required: true,
      unique: true,
    },
    scientific_name: {
      type: String, // type is a special property in Mongoose schemas. When Mongoose finds a nested property named type in your schema, Mongoose assumes that it needs to define a SchemaType with the given type; type: { type: String } would be a workaround to store something as an object with a type property
      lowercase: true,
      required: true,
      unique: true,
    },
    family: {
      type: String,
      lowercase: true,
      required: true,
    },
    genus: {
      type: String,
      lowercase: true,
      required: true,
    },
    nesting_habitat: {
      type: [String],
      lowercase: true,
    },
    prey_type: {
      type: [String],
      lowercase: true,
    },
    continents: {
      type: [String],
      lowercase: true,
      required: true,
    },
    conservation_status: {
      type: String,
      lowercase: true,
    },
    habitat_type: {
      type: [String],
      lowercase: true,
    },
    associated_falconries: {
      type: [String],
      lowercase: true,
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
