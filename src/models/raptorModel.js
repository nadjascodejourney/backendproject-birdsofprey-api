import mongoose from "mongoose";

const raptorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    scientific_name: {
      type: String,
    },
    nesting_habitat: {
      type: [String],
    },
    prey_type: {
      type: [String],
    },
    continents: {
      type: [String],
    },
    conservation_status: {
      type: String,
    },
    habitat_type: {
      type: [String],
    },
    associated_falconries: {
      type: [String],
    },
    wing_span_cm: {
      type: Number,
    },
    migration_distance_km: {
      type: Number,
    },
    average_lifespan_years: {
      type: Number,
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
