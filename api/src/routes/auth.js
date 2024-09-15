// auth.js (Authentication-related routes)
const express = require("express");
const router = express.Router();
const {
  registerUser,
  login,
  verifyToken,
  logout,
} = require("../controllers/authController");

const { auth } = require("../middleware/jwtAuth");

// Register a new user
router.post("/register", registerUser);

// Login route
router.post("/login", login);

// Verify JWT token
router.get("/verifyToken", verifyToken);

// Logout route
router.post("/logout", logout);

// General route to check if user is admin (optional)
router.get("/admin-access", auth, (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).send({ error: "Access denied. Admins only." });
  }
  res.send("Admin access verified");
});

module.exports = router;
