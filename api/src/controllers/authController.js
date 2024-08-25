const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

// Controller for user registration
const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    user = new User({ name, email, password });

    await user.save();

    res.status(201).json({ msg: "User registered successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Controller for user login
const login = async (req, res) => {
  const { email, password } = req.body;

  // Verify test credentials
  if (
    email === process.env.TEST_USER_EMAIL &&
    password === process.env.TEST_USER_PASSWORD
  ) {
    const token = jwt.sign(
      { email: process.env.TEST_USER_EMAIL, role: "test" },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    return res.json({ token });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Incorrect password" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token });
  } catch (err) {
    console.error("Error during login process:", err.message);
    res.status(500).send("Server error");
  }
};

// Controller to verify JWT token
const verifyToken = (req, res) => {
  const token = req.header("Authorization").replace("Bearer ", "");

  if (!token) {
    return res.status(401).send({ error: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.send({ message: "Token is valid", user: decoded });
  } catch (ex) {
    res.status(400).send({ error: "Invalid token." });
  }
};

module.exports = {
  register,
  login,
  verifyToken,
};
