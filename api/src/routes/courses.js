const express = require("express");
const router = express.Router();
const {
  getCourses,
  createCourse,
  buyCourse,
  deleteCourse,
} = require("../controllers/courseController");
const { auth, authorize } = require("../middleware/jwtAuth");

// Rutas para gestionar los cursos
router.get("/", auth, authorize(["admin"]), getCourses); // Ruta para obtener cursos (solo admin)
router.post("/", auth, authorize(["admin"]), createCourse); // Ruta para crear un nuevo curso (solo admin)
router.delete("/:courseId", auth, authorize(["admin"]), deleteCourse);

// Ruta para comprar un curso (cualquier usuario autenticado puede acceder)
router.post("/buy", auth, buyCourse);

module.exports = router;
