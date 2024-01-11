const nodemailer = require("nodemailer");
const randomstring = require("randomstring");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const otpStore = {};

exports.generateOtp = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ error: "User not found. Invalid email." });
    }

    const otp = randomstring.generate({ length: 6, charset: "numeric" });

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: "OTP for Password Change",
      text: `Your OTP is: ${otp}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ error: "Failed to send OTP via email." });
      }

      otpStore[email] = otp;
      res.status(200).json({ message: "OTP sent successfully." });
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Failed to generate OTP." });
  }
};

exports.verifyOtpAndUpdatePassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ error: "User not found. Invalid email." });
    }

    const storedOtp = otpStore[email];

    if (!storedOtp || storedOtp !== otp) {
      return res.status(400).json({ error: "Invalid OTP." });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      { password: hashedPassword, confirmPassword: hashedPassword },
      { new: true }
    );

    delete otpStore[email];

    return res.status(200).json({ message: "Password changed successfully." });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Failed to verify OTP and update password." });
  }
};
