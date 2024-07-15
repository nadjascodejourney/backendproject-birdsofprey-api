import { model } from "mongoose"; // model is a function that returns a mongoose model

import { z } from "zod"; // z is a function that returns an object with a bunch of methods from the zod library (validation library)

import { zodSchema } from "@zodyac/zod-mongoose"; // Zod to mongoose schema converter

const falconrySchema = z.object({
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
  falconry_email: z.string().email({ message: "Invalid E-Mail Address" }), // email is a method from zod that validates if the string is an email
  falconry_website: z.string().url({ message: "invalid url" }), // url is a method from zod that validates if the string is an url
  numberOfRaptors: z
    .number({
      invalid_type_error: "Must be a number",
    })
    .int()
    .positive(),
  numberOfEmployees: z
    .number({
      invalid_type_error: "Must be a number",
    })
    .int()
    .positive(),
});

const zFalconrySchema = zodSchema(falconrySchema);

export const Falconry = model("Falconry", zFalconrySchema);

/* // Mongoose-Schema for Falconry instead of Converting it with the library above:

const falconrySchemaFields = {
  falconry_name: { type: String, required: true },
  falconry_address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
  },
  falconry_email: { type: String, required: true },
  raptors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Raptor' }], // Referenz auf Raptors
};

const falconrySchema = new mongoose.Schema(falconrySchemaFields);

const Falconry = mongoose.model('Falconry', falconrySchema); */
