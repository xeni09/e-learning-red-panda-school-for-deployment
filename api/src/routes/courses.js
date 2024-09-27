const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const {
  getCourses,
  createCourse,
  buyCourse,
  deleteCourse,
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

// Ruta para comprar un curso (cualquier usuario autenticado puede acceder)
router.post("/buy", auth, buyCourse);

module.exports = router;
