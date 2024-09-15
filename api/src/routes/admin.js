const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/jwtAuth"); // Import auth middleware
const User = require("../models/User"); // Importar modelo de usuarios
const Course = require("../models/Course"); // Importar modelo de cursos

// Admin dashboard route
router.get("/dashboard", auth, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Access denied. Admins only." });
  }

  try {
    // Obtener el número de usuarios y cursos desde la base de datos
    const usersCount = await User.countDocuments(); // Contar usuarios
    const coursesCount = await Course.countDocuments(); // Contar cursos

    const dashboardData = {
      usersCount,
      coursesCount,
    };

    res.json(dashboardData);
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    res.status(500).json({ error: "Error fetching dashboard data" });
  }
});

module.exports = router;
