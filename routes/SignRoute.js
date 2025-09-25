const express = require("express");
const router = express.Router();
const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config();

// Signup route
router.post("/api/signup", async (req, res) => {
  try {
    const { name, username, role, email, password } = req.body;

    if (!name || !username || !role || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (role === "Admin") {
      const existingAdmin = await User.findOne({ role: "Admin" });
      if (existingAdmin) {
        return res.status(409).json({ message: "An Admin already exists" });
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ name, username, role, email, password: hashedPassword });
    await user.save();

    const token = jwt.sign(
      { username: user.username, role: user.role },
      process.env.SECRET_KEY,
      { expiresIn: "2h" }
    );

    return res.status(201).json({ message: "Signup successful", token });
  } catch (err) {
    return res.status(500).json({ message: "Server Side Error" });
  }
});

// Login route
router.post("/api/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Invalid username" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { username: user.username, role: user.role },
      process.env.SECRET_KEY,
      { expiresIn: "2h" }
    );

    return res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    return res.status(500).json({ message: "Server Side Error" });
  }
});

// Get user by username
router.get("/user/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username }).select("-password"); // omit password

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "User found successfully", user });
  } catch (err) {
    return res.status(500).json({ message: "Server Side Error" });
  }
});

module.exports = router;





