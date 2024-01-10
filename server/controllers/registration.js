const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');

const registerController = async (req, res) => {
  try {

    const { username, email, password, confirmPassword } = req.body;

    if (!username) {
      return res.status(400).json({ success: false, message: "Username is required" });
    }
    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required" });
    }
    if (!password) {
      return res.status(400).json({ success: false, message: "Password is required" });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ success: false, message: "Passwords do not match" });
    }

    
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists. Please login." });
    }

    
    const hashedPassword = await bcrypt.hash(password, 10);

   
    const newUser = await userModel.create({
      username,
      email,
      password: hashedPassword,
      confirmPassword, 
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: newUser,
    });
  } catch (error) {
    console.error(error);

    if (error.code === 11000 && error.keyPattern && error.keyValue) {
      
      const field = Object.keys(error.keyPattern)[0];
      const value = error.keyValue[field];

      return res.status(400).json({
        success: false,
        message: `User with ${field} '${value}' already exists.`,
      });
    }

   
    res.status(500).json({
      success: false,
      message: "Error in registration",
      error: {
        name: error.name,
        message: error.message,
        stack: error.stack,
      },
    });
  }
};

module.exports = registerController;
