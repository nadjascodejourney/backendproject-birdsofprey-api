import { number, z } from "zod"; // z is a function that returns an object with a bunch of methods from the zod library (validation library)

/* import { zodSchema } from "@zodyac/zod-mongoose"; // Zod to mongoose schema converter */

export const falconryZValidation = z.object({
  falconry_name: z
    .string({
      required_error: "Falconry name is required",
      invalid_type_error: "Falconry name must be a string",
    })
    .toLowerCase()
    .trim()
    .min(1, { message: "must be at least 1 character long" })
    .max(100),
  falconry_address: z.object({
    street: z
      .string()
      .toLowerCase()
      .trim()
      .min(1, { message: "must be at least 1 character long" })
      .max(100),
    city: z
      .string()
      .toLowerCase()
      .trim()
      .min(1, { message: "must be at least 1 character long" })
      .max(100),
    state: z
      .string()
      .toLowerCase()
      .trim()
      .min(1, { message: "must be at least 1 character long" })
      .max(100),
    country: z
      .string()
      .toLowerCase()
      .trim()
      .min(1, { message: "must be at least 1 character long" })
      .max(100),
  }),
  numberOfRaptors: z
    .number({
      invalid_type_error: "Must be a number",
    })
    .int()
    .positive(),
  falconry_email: z.string().email({ message: "Invalid E-Mail Address" }),
  // email is a method from zod that validates if the string is an email
  falconry_website: z.string().url({ message: "invalid url" }), //! not saving yet, TODO: check
  // url is a method from zod that validates if the string is an url
  numberOfEmployees: z
    .number({
      invalid_type_error: "Must be a number",
    }) //! not saving yet, TODO: check
    .int()
    .positive(),
});

/* const zFalconrySchema = zodSchema(falconrySchema);
export const Falconry = model("Falconry", zFalconrySchema);
 */
