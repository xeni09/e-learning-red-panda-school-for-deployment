const express = require("express");
const router = express.Router();
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinaryConfig");
const { auth, authorize } = require("../middleware/jwtAuth");

const {
  getCourseSections,
  addCourseSection,
  updateCourseSection,
  deleteCourseSection,
  getSectionById,
} = require("../controllers/courseSectionController");

// Configuración de multer para almacenar imágenes en Cloudinary
const sectionStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "sections", // Carpeta donde se guardarán las imágenes en Cloudinary
    allowed_formats: ["jpg", "png", "jpeg"], // Formatos permitidos
    transformation: [{ width: 500, height: 500, crop: "limit" }], // Opcional: Transformar las imágenes
  },
});

const sectionUpload = multer({ storage: sectionStorage });

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
  sectionUpload.single("sectionImage"), // Usa sectionUpload aquí
  addCourseSection
);

// Ruta para eliminar una sección de un curso
router.delete(
  "/:courseId/sections/:sectionId",
  auth,
  authorize(["admin"]),
  deleteCourseSection
);

// Ruta para obtener una sección específica de un curso
router.get(
  "/:courseId/sections/:sectionId",
  auth,
  authorize(["admin"]),
  getSectionById
);

// Actualizar una sección existente
router.put(
  "/:courseId/sections/:sectionId",
  auth,
  authorize(["admin"]),
  sectionUpload.single("sectionImage"), // Usa multer para la subida de la imagen
  updateCourseSection
);

// Ruta para subir la imagen de la sección
router.post(
  "/:courseId/sections/upload-image",
  sectionUpload.single("sectionImage"),
  async (req, res) => {
    try {
      const imageUrl = req.file.path;

      res.json({ imageUrl });
    } catch (error) {
      console.error("Error uploading section image:", error);
      res.status(500).send("Error uploading section image");
    }
  }
);

module.exports = router;
