const Course = require("../models/Course");
const cloudinary = require("../config/cloudinaryConfig");
const fs = require("fs");
const path = require("path");

// // Función para extraer el publicId de Cloudinary desde la URL
// const extractPublicId = (url) => {
//   const parts = url.split("/");
//   const fileNameWithExtension = parts.pop(); // Obtén la última parte (el nombre del archivo con extensión)
//   const publicId = fileNameWithExtension.split(".")[0]; // Remueve la extensión
//   return publicId;
// };

// // Función para eliminar imagen de Cloudinary
// const deleteImageFromCloudinary = async (imageUrl, folder) => {
//   if (imageUrl) {
//     const publicId = extractPublicId(imageUrl);
//     try {
//       await cloudinary.uploader.destroy(`${folder}/${publicId}`);
//     } catch (err) {}
//   }
// };

// Función para eliminar el archivo local tras la subida a Cloudinary
// const deleteLocalFile = (filePath) => {
//   const uploadsDir = path.resolve(__dirname, "../uploads"); // Define a safe uploads directory

//   // Ensure the file path is within the uploads directory to prevent path traversal
//   if (filePath.startsWith(uploadsDir)) {
//     fs.unlink(filePath, (err) => {
//       if (err) {
//         console.error("Error deleting local file:", err);
//       }
//     });
//   } else {
//     console.error("Unsafe file path detected:", filePath);
//   }
// };

// Obtener secciones de un curso
const getCourseSections = async (req, res) => {
  const { courseId } = req.params;
  try {
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.json(course.sections);
  } catch (error) {
    console.error("Error fetching sections:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Agregar una nueva sección
const addCourseSection = async (req, res) => {
  const { courseId } = req.params;
  const { title, description, videoUrl } = req.body;

  try {
    // Verificación de campos obligatorios
    if (!title || !description) {
      return res
        .status(400)
        .json({ message: "Title and description are required" });
    }

    // Buscar el curso para añadir la sección
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    // Subir imagen a Cloudinary si existe en la solicitud
    let sectionImage = null;
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "sections", // Especifica la carpeta en Cloudinary
        transformation: { width: 300, height: 200, crop: "limit" }, // Transformación opcional
      });
      sectionImage = result.secure_url; // URL seguro de Cloudinary
    }

    // Crear la nueva sección con los datos proporcionados
    const newSection = { title, description, videoUrl, sectionImage };
    course.sections.push(newSection); // Agregar la sección al curso
    await course.save(); // Guardar el curso actualizado

    // Enviar la nueva sección en la respuesta
    const createdSection = course.sections[course.sections.length - 1];
    res.status(201).json(createdSection);
  } catch (error) {
    console.error("Error adding section:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Actualizar una sección
const updateCourseSection = async (req, res) => {
  const { courseId, sectionId } = req.params;
  const { title, description, videoUrl } = req.body;

  try {
    // Validaciones
    if (!title || !description) {
      return res.status(400).json({
        message: "Title and description are required",
      });
    }

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    const section = course.sections.id(sectionId);
    if (!section) return res.status(404).json({ message: "Section not found" });

    // Actualizar los campos de la sección
    section.title = title || section.title;
    section.description = description || section.description;
    section.videoUrl = videoUrl || section.videoUrl;

    if (req.file) {
      // Subir la nueva imagen sin eliminar la anterior
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "sections",
        transformation: { width: 300, height: 200, crop: "limit" },
      });
      section.sectionImage = result.secure_url; // Actualizar con la nueva URL
    }

    // Guardar los cambios
    await course.save();
    res.status(200).json(section);
  } catch (error) {
    console.error("Error updating section:", error.message);
    res
      .status(500)
      .json({ message: "Error updating section", error: error.message });
  }
};

// Eliminar una sección
const deleteCourseSection = async (req, res) => {
  const { courseId, sectionId } = req.params;

  try {
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    const section = course.sections.id(sectionId);
    if (!section) return res.status(404).json({ message: "Section not found" });

    // // Eliminar la imagen de Cloudinary si existe
    // if (section.sectionImage) {
    //   await deleteImageFromCloudinary(section.sectionImage, "sections");
    // }

    // Eliminar solo la sección sin manipular las imágenes de Cloudinary
    course.sections.pull({ _id: sectionId });
    await course.save();

    res.status(200).json({ message: "Section deleted successfully" });
  } catch (error) {
    console.error("Error deleting section:", error.message);
    res
      .status(500)
      .json({ message: "Error deleting section", error: error.message });
  }
};

// Obtener una sección específica de un curso
const getSectionById = async (req, res) => {
  const { courseId, sectionId } = req.params;

  try {
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const section = course.sections.id(sectionId);
    if (!section) {
      return res.status(404).json({ message: "Section not found" });
    }

    res.json(section);
  } catch (error) {
    console.error("Error fetching section:", error);
    res.status(500).json({ message: "Error fetching section", error });
  }
};

module.exports = {
  getCourseSections,
  addCourseSection,
  updateCourseSection,
  deleteCourseSection,
  getSectionById,
};
