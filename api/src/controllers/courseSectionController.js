const Course = require("../models/Course");
const cloudinary = require("../config/cloudinaryConfig");
const fs = require("fs");
const path = require("path");

// Función para extraer el publicId de Cloudinary desde la URL
const extractPublicId = (url) => {
  const parts = url.split("/");
  const fileNameWithExtension = parts.pop(); // Obtén la última parte (el nombre del archivo con extensión)
  const publicId = fileNameWithExtension.split(".")[0]; // Remueve la extensión
  return publicId;
};

// Función para eliminar imagen de Cloudinary
const deleteImageFromCloudinary = async (imageUrl, folder) => {
  if (imageUrl) {
    const publicId = extractPublicId(imageUrl);
    try {
      await cloudinary.uploader.destroy(`${folder}/${publicId}`);
    } catch (err) {}
  }
};

// Secure function to delete the local file after Cloudinary upload
const deleteLocalFile = (filePath) => {
  // Set the designated upload directory
  const uploadDir = path.resolve(__dirname, "../../public/uploads");

  // Resolve the file path and verify it’s within the upload directory
  const resolvedPath = path.resolve(uploadDir, filePath);

  if (!resolvedPath.startsWith(uploadDir)) {
    console.error("Unauthorized path detected. Aborting file deletion.");
    return;
  }

  // Safe deletion if validation passes
  fs.unlink(resolvedPath, (err) => {
    if (err) {
      console.error("Error deleting the local file:", err);
    } else {
      console.log("File deleted successfully:", resolvedPath);
    }
  });
};

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
    // Validaciones
    if (!title || !description) {
      return res.status(400).json({
        message: "Title and description are required",
      });
    }

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    let sectionImage = null;
    if (req.file) {
      try {
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: "sections",
          transformation: { width: 300, height: 200, crop: "limit" },
        });
        sectionImage = result.secure_url;

        // Eliminar el archivo local tras la subida a Cloudinary
        deleteLocalFile(req.file.path);
      } catch (error) {
        console.error("Error uploading image to Cloudinary:", error);
        return res.status(500).json({ message: "Error uploading image" });
      }
    }

    // Crear la nueva sección
    const newSection = { title, description, videoUrl, sectionImage };
    course.sections.push(newSection);
    await course.save();

    // Devolver la nueva sección creada
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
      try {
        // Eliminar la imagen anterior si existe
        if (section.sectionImage) {
          await deleteImageFromCloudinary(section.sectionImage, "sections");
        }

        // Subir la nueva imagen
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: "sections",
          transformation: { width: 300, height: 200, crop: "limit" },
        });
        section.sectionImage = result.secure_url; // Actualizar con la nueva URL

        // Eliminar el archivo local tras la subida
        deleteLocalFile(req.file.path);
      } catch (error) {
        console.error("Error uploading image to Cloudinary:", error);
        return res.status(500).json({ message: "Error uploading image" });
      }
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

    // Eliminar la imagen de Cloudinary si existe
    if (section.sectionImage) {
      await deleteImageFromCloudinary(section.sectionImage, "sections");
    }

    // Eliminar la sección del curso
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
