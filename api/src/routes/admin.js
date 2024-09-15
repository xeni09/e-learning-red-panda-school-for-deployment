const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/jwtAuth"); // Import auth middleware

// Admin dashboard route
router.get("/dashboard", auth, (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Access denied. Admins only." });
  }

  const dashboardData = {
    usersCount: 100, // Example data, replace with real data from DB
    coursesCount: 5,
    revenue: 10000,
  };

  res.json(dashboardData);
});

module.exports = router;
