const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const Course = require("../models/Course");

const {
  getCourses,
  createCourse,
  buyCourse,
  deleteCourse,
  updateCourse,
  getCourseById,
  getCourseSections,
  addCourseSection,
} = require("../controllers/courseController");
const { auth, authorize } = require("../middleware/jwtAuth");

// Configurar multer para la subida de imágenes
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../public/uploads")); // Guardar las imágenes en la carpeta /public/uploads
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Asignar un nombre único a la imagen
  },
});

const upload = multer({ storage: storage });

// Rutas para gestionar los cursos
router.get("/", auth, authorize(["admin"]), getCourses); // Ruta para obtener cursos (solo admin)
router.post(
  "/",
  auth,
  authorize(["admin"]),
  upload.single("courseImage"),
  createCourse
); // Ruta para crear un nuevo curso con imagen (solo admin)
router.delete("/:courseId", auth, authorize(["admin"]), deleteCourse); // Ruta para eliminar un curso

// Ruta para actualizar un curso (solo admin)
router.put(
  "/:courseId",
  auth,
  authorize(["admin"]),
  upload.single("courseImage"),
  updateCourse
);

// Ruta para obtener los detalles de un curso por su ID (solo accesible para administradores)
router.get("/:courseId", auth, authorize(["admin"]), getCourseById);

// Rutas para crear secciones
router.get(
  "/:courseId/sections",
  auth,
  authorize(["admin"]),
  getCourseSections
); // Obtener secciones de un curso
router.post(
  "/:courseId/sections",
  auth,
  authorize(["admin"]),
  addCourseSection
); // Agregar una nueva sección

// Ruta para comprar un curso (cualquier usuario autenticado puede acceder)
router.post("/buy", auth, buyCourse);

module.exports = router;
