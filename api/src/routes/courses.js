const express = require("express");
const router = express.Router();
const { getCourses, createCourse } = require("../controllers/courseController"); // Asegúrate de tener estos controladores
const { auth, authorize } = require("../middleware/jwtAuth");

// Rutas para gestionar los cursos
router.get("/", auth, authorize(["admin"]), getCourses); // Ruta para obtener cursos
router.post("/", auth, authorize(["admin"]), createCourse); // Ruta para crear un nuevo curso

module.exports = router;
