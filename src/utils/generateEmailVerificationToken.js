import crypto from "crypto";

export const generateEmailVerificationToken = () => {
  return crypto.randomBytes(64).toString("hex");
};
