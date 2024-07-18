import express from "express";

import {
  userlogin,
  userlogout,
  userregister,
  getAllUsers,
  getUserById,
} from "../controllers/userController.js";

export const userRouter = express.Router();

userRouter.route("/").get(getAllUsers);
userRouter.route("/:id").get(getUserById);

userRouter.post("/register", userregister);
userRouter.post("/login", userlogin);
userRouter.post("/logout", userlogout);
