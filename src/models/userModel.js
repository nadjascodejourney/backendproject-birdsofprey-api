import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchemaFields = {
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true },

  favoriteRaptors: [{ type: Schema.Types.ObjectId, ref: "Raptor" }],
  isVerified: { type: Boolean, default: false }, // for email verification, will change to true after the user verifies their email
  emailVerificationToken: { type: String },
  emailVerificationTokenExpiry: { type: Date },
};

const userSchema = new mongoose.Schema(userSchemaFields, { timestamps: true });

export const User = mongoose.model("User", userSchema);
