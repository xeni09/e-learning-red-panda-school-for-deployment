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
  deleteCourseSection,
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
router.get("/", auth, authorize(["admin"]), getCourses);

// Ruta para crear un nuevo curso con imagen (solo admin)
router.post(
  "/",
  auth,
  authorize(["admin"]),
  upload.single("courseImage"),
  createCourse
);

// Ruta para eliminar un curso
router.delete("/:courseId", auth, authorize(["admin"]), deleteCourse);

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
);

// Agregar una nueva sección con subida de imagen
router.post(
  "/:courseId/sections",
  auth,
  authorize(["admin"]),
  upload.single("thumbnail"), // Permitir la subida de una imagen para la sección
  addCourseSection
);
// Rutapara eliminar una sección de un curso
router.delete(
  "/:courseId/sections/:sectionId",
  auth,
  authorize(["admin"]),
  deleteCourseSection
);

// Ruta para comprar un curso (cualquier usuario autenticado puede acceder)
router.post("/buy", auth, buyCourse);

module.exports = router;
