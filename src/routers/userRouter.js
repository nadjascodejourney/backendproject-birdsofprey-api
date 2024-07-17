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
