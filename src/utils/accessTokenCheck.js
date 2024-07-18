import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../models/userModel.js";

dotenv.config();
const secretKey = process.env.JWTSECRET;

export const accessTokenCheck = async (req, res, next) => {
  try {
    const authorization = req.cookies["accessToken"];

    if (!authorization) {
      return res.status(401).json({
        message: "You need to be logged in.",
      }); // 401 Unauthorized
    }

    jwt.verify(authorization, secretKey, async (error, decoded) => {
      if (error) {
        return res.sendStatus(403);
      }

      const user = await User.findOne({ username: decoded.username });

      if (!user) {
        return res.sendStatus(404);
      }

      req.user = user;

      next();
    });
  } catch (error) {
    next(error);
  }
};
