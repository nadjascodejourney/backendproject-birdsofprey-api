import { z } from "zod";

export const userZValidation = z.object({
  username: z
    .string({
      required_error: "Username is required",
      invalid_type_error: "Username must be a string",
    })
    .min(3, { message: "must be at least 5 characters long" })
    .trim(),
  email: z.string().email({ message: "Invalid E-Mail Address" }),
  password: z
    .string()
    .min(8, { message: "must be at least 8 characters long" }),
  role: z.enum(["admin", "user"]).default("user"),
  favoriteRaptors: z
    .array(
      z.string().regex(/^[0-9a-fA-F]{24}$/, { message: "Invalid ObjectId" })
    )
    .optional(),
});

// for partially updating a user
export const userPartialZValidation = userZValidation.partial();
