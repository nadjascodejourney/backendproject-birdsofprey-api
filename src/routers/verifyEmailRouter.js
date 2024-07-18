import express from "express";

import { verifyemail } from "../controllers/verifyemailController.js";

export const verifyEmailRouter = express.Router();

verifyEmailRouter.route("/").get(verifyemail);
//? Post or get? Depends on the implementation: if the user clicks on a link in an email, it's a get request, if the user submits a form, it's a post request
