const bcrypt = require("bcryptjs");
const User = require("../models/userModels");
const jwt = require("jsonwebtoken");
require('dotenv').config();

const register = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    // Validate email format
    const emailPattern = /\S+@\S+\.\S+/;
    if (!emailPattern.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }
    // Validate password
    const passwordPattern = /^(?=.*[A-Z])(?=.*[\W_]).{8,}$/;
    if (!passwordPattern.test(password)) {
      return res.status(400).json({
        error:
          "Password must be at least 8 characters long, start with an uppercase letter, and include at least one special character",
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    //create and save new user

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    res.status(200).json({
      statusCode: 200,
      status: true,
      message: "User registered successfully. .",
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Validate input
      if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
      }
  
      // Find the user by email
      const user = await User.findOne({ email });
  
      // Check if user exists
      if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
  
      // Compare passwords
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
  
      // Generate JWT token
      const token = jwt.sign(
        { userId: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );
  
      // Respond with token and user information
      res.status(200).json({
        statusCode: 200,
        status: true,
        token,
        userId: user._id,
        message: "User logged in successfully",
      });
  
    } catch (error) {
      console.error("Error logging in user:", error); // Log detailed error message
      res.status(500).json({ error: "Internal server error" });
    }
  };

  const getUserDetails = async (req, res) => {
    try {
      const email = req.query.email; // Read email from query parameters
  
      if (!email) {
        return res.status(400).json({ error: "Email parameter is required" });
      }
  
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      res.status(200).json({
        fullName: user.fullName,
        email: user.email,
        statusCode: 200,
        status: true,
        message: "User Profile Details"
      });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  };

module.exports = {register, login, getUserDetails};
