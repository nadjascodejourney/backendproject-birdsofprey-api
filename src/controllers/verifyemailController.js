import { User } from "../models/userModel.js";

export const verifyemail = async (req, res, next) => {
  try {
    const { token } = req.query; // get the token from the query string in the URL (e.g. /verifyemail?token=123456)

    // check if the token is missing
    if (!token) {
      return res.status(400).json({ message: "Token is missing" });
    }

    // Find the user with the emailVerificationToken
    const user = await User.findOne({
      emailVerificationToken: token,
      emailVerificationTokenExpiry: { $gt: Date.now() }, // check if the token is still valid (expiry date is in the future)
    });

    // check if the user exists
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the user's isVerified field to true
    user.isVerified = true;
    user.emailVerificationToken = undefined; // undefine is better than null in this case, because it is a falsy value and can be checked with if (user.emailVerificationToken); null is a truthy value and this might lead to bugs
    user.emailVerificationTokenExpiry = undefined; // same here

    await user.save(); // save the updated user to the database

    // Send a success message
    res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    next(error);
  }
};
