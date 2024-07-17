import express from "express";

import {
  userlogin,
  userlogout,
  userregister,
} from "../controllers/userController.js";

export const userRouter = express.Router();

userRouter.post("/register", userregister);

userRouter.post("/login", userlogin);

userRouter.post("/logout", userlogout);

// TODO: Implement the verifyemail router
//? Post or get? Depends on the implementation: if the user clicks on a link in an email, it's a get request, if the user submits a form, it's a post request
// userRouter.get("/verifyemail", verifyemail);
