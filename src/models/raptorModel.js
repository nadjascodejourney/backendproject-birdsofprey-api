import mongoose from "mongoose";

const raptorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    scientific_name: {
      type: String,
      required: true,
    },
    nesting_habitat: {
      type: [String],
      required: true,
    },
    prey_type: {
      type: [String],
      required: true,
    },
    continents: {
      type: [String],
      required: true,
    },
    conservation_status: {
      type: String,
      required: true,
    },
    habitat_type: {
      type: [String],
      required: true,
    },
    associated_falconries: {
      type: [String],
      required: true,
    },
    wing_span_cm: {
      type: Number,
      required: true,
    },
    migration_distance_km: {
      type: Number,
      required: true,
    },
    average_lifespan_years: {
      type: Number,
      required: true,
    },
    weight_gr: {
      type: Number,
      required: true,
    },
  }, // timestamps must be outside of the object as a second argument; now mongoose can create the timestamps createdAt and updatedAt
  {
    timestamps: true,
  }
);

export const Raptor = mongoose.model("Raptor", raptorSchema);
