import { User } from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

/* import {
  userZValidation,
  userPartialZValidation,
} from "../utils/userZValidation.js"; */

import { generateEmailVerificationToken } from "../utils/generateEmailVerificationToken.js";
import { sendEmailVerification } from "../utils/verificationEmailService.js";

// Load the secret key from the .env file
dotenv.config();
const secretKey = process.env.JWTSECRET;

export const userregister = async (req, res, next) => {
  try {
    const { username, email, password, role } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email }); // checks if the username and email already exist in the database
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "A User with this E-Mail already exists" });
    }

    // Check if there is an email and password in the request
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // bcrypt.hash() hashes the password with a salt of 10 rounds

    const emailVerificationToken = generateEmailVerificationToken();
    const emailVerificationTokenExpiry = Date.now() + 3600000; // 1 hour

    // Create a new user
    const newUser = new User({
      // id
      username,
      email,
      password: hashedPassword,
      role,
      emailVerificationToken,
      emailVerificationTokenExpiry,
    });

    // Save the user to the database
    await newUser.save();

    // Send an email with the email verification
    sendEmailVerification(email, emailVerificationToken);

    // Send a success message
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    next(error);
  }
};

export const userlogin = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // User.findOne() returns a promise of the document that matches the query (username is unique)
    const user = await User.findOne({ username });

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the user is verified by email verification (by default isVerified is false)
    if (!user.isVerified) {
      return res.status(401).json({ message: "Verify your Account" }); //? 401 or 403?  401 is more appropriate because the user is not authenticated yet
    }

    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password); // bycrypt.compare() compares the password from the request with the hashed password from the database (user.password)
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // If everything is fine, sign a jwt token
    const accessToken = jwt.sign({ username }, secretKey, {
      // never store sensitive data in the token, such as passwords! The token is decoded on the client side and can be read by anyone => only store the user's username in the token or other non-sensitive data
      algorithm: "HS256",
      expiresIn: "1h",
    });

    // If the token is mising or invalid, return an error
    if (!accessToken) {
      return res.status(401).json({
        error: "Unauthorized",
        message: "Access token is missing or invalid",
      });
    }

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
      maxAge: 1000 * 60 * 60, // 1 hour
    });

    // Send the token back to the client
    res.json({ accessToken });
  } catch (error) {
    next(error);
  }
};

export const userlogout = async (req, res, next) => {
  try {
    res.clearCookie("accessToken");
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    next(error);
  }
};
