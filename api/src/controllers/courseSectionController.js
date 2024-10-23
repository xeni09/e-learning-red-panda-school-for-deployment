const Course = require("../models/Course");
const cloudinary = require("../config/cloudinaryConfig");
const fs = require("fs");

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
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    let sectionImage = null;
    if (req.file) {
      try {
        console.log("Subiendo imagen a Cloudinary...");

        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: "sections",
          transformation: { width: 300, height: 200, crop: "limit" },
        });
        sectionImage = result.secure_url;
        console.log("Imagen subida con URL:", result.secure_url);
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
        if (section.sectionImage) {
          const publicId = section.sectionImage.split("/").pop().split(".")[0]; // Extraer el publicId de Cloudinary
          await cloudinary.uploader.destroy(`sections/${publicId}`); // Eliminar la imagen anterior
        }

        // Subir la nueva imagen
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: "sections",
          transformation: { width: 300, height: 200, crop: "limit" },
        });
        section.sectionImage = result.secure_url; // Actualizar con la nueva URL
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
