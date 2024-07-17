import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { error } from "npmlog";

dotenv.config();

// Create a nodemailer transporter
const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.ETHEREAL_EMAIL,
    pass: process.env.ETHEREAL_PASS,
  },
});

// Send an email with the email verification token
export const sendEmailVerification = async (email, emailVerificationToken) => {
  const verificationUrl = `${process.env.CLIENT_URL}/verifyemail?token=${emailVerificationToken}`;

  try {
    const mailOptions = {
      from: process.env.ETHEREAL_EMAIL,
      to: email,
      subject: "Verify Account",
      html: `
        <a href="${verificationUrl}">Click to Verify</a>
      `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log("Message sent: %s", info.messageId);
    });
  } catch (error) {
    console.error(error);
  }
};

// Verify the token and update the user's isVerified field
