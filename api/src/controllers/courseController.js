const Course = require("../models/Course");
const User = require("../models/User");
const fs = require("fs");
const path = require("path");
const util = require("util");
const unlinkAsync = util.promisify(fs.unlink);
const fsExistsAsync = util.promisify(fs.exists);

// Obtener todos los cursos
const getCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate("teacher", "name");
    res.json(courses);
  } catch (error) {
    console.error("Error fetching courses:", error.message);
    res.status(500).send("Server error");
  }
};

// Crear un nuevo curso con imagen y customId
const createCourse = async (req, res) => {
  try {
    const { name, description, price, category, teacher } = req.body;

    // Verificar si la imagen está presente en la solicitud
    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    // Asignar la ruta de la imagen
    const imagePath = `/uploads/${req.file.filename}`;

    // Verificar si todos los campos requeridos están presentes
    if (!name || !description || !price || !category || !teacher) {
      return res.status(400).json({
        error: "Validation error",
        details:
          "Missing required fields: name, description, price, category, teacher",
      });
    }

    // Verificar que el precio sea un número
    if (isNaN(price)) {
      return res.status(400).json({
        error: "Validation error",
        details: "Price must be a number",
      });
    }

    // Obtener el último curso para determinar el próximo `customId`
    const lastCourse = await Course.findOne().sort({ customId: -1 });
    const newCustomId = lastCourse ? lastCourse.customId + 1 : 1;

    // Crear el nuevo curso
    const newCourse = new Course({
      customId: newCustomId,
      name,
      description,
      price: parseFloat(price), // Asegurar que el precio sea tratado como número
      category,
      imageSrc: imagePath, // Asignar la imagen cargada
      teacher,
    });

    // Guardar el curso en la base de datos
    await newCourse.save();
    res.status(201).json(newCourse);
  } catch (error) {
    console.error("Error creating course:", error.message);
    res.status(500).json({
      error: "Server error while creating course",
      details: error.message,
    });
  }
};

// Actualizar un curso existente
const updateCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { name, description, price, category, teacher } = req.body;

    // Verificar si el curso existe
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Verificar si todos los campos requeridos están presentes
    if (!name || !description || !price || !category || !teacher) {
      return res.status(400).json({
        error: "Validation error",
        details:
          "Missing required fields: name, description, price, category, teacher",
      });
    }

    // Verificar que el precio sea un número
    if (isNaN(price)) {
      return res.status(400).json({
        error: "Validation error",
        details: "Price must be a number",
      });
    }

    // Actualizar los campos del curso
    course.name = name;
    course.description = description;
    course.price = parseFloat(price);
    course.category = category;
    course.teacher = teacher;

    // Verificar si hay una nueva imagen cargada
    if (req.file) {
      // Eliminar la imagen anterior
      const oldImagePath = path.join(__dirname, `../public${course.imageSrc}`);
      const fileExists = await fsExistsAsync(oldImagePath);
      if (fileExists) {
        await unlinkAsync(oldImagePath);
      }

      // Asignar la nueva imagen
      course.imageSrc = `/uploads/${req.file.filename}`;
    }

    // Guardar los cambios
    await course.save();
    res.status(200).json(course);
  } catch (error) {
    console.error("Error updating course:", error.message);
    res
      .status(500)
      .json({ message: "Error updating course", error: error.message });
  }
};

// Eliminar un curso existente y su imagen asociada
const deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { deleteImage } = req.body; // Recibir un parámetro para verificar si se elimina la imagen o no.

    // Buscar el curso por su ID
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Obtener la ruta de la imagen
    const imagePath = path.join(__dirname, `../public${course.imageSrc}`);

    if (deleteImage) {
      // Solo eliminar la imagen si deleteImage es verdadero
      const fileExists = await fsExistsAsync(imagePath);
      if (fileExists) {
        // Eliminar el archivo de imagen
        try {
          await unlinkAsync(imagePath);
          console.log("Course image deleted successfully");
        } catch (err) {
          console.error("Error deleting image file:", err);
          return res
            .status(500)
            .json({ message: "Error deleting course image" });
        }
      } else {
        console.log("Image file does not exist");
      }
    }

    // Eliminar el curso de la base de datos
    await course.deleteOne();
    res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    console.error("Error deleting course:", error.message);
    res.status(500).json({ message: "Error deleting course", error });
  }
};

// Simular la compra de un curso
const buyCourse = async (req, res) => {
  try {
    const userId = req.user._id; // Usuario autenticado
    const { courseId } = req.body;

    // Verificar si el curso existe
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Buscar al usuario
    const user = await User.findById(userId);

    // Verificar si el usuario ya compró el curso
    if (user.courses.includes(courseId)) {
      return res
        .status(400)
        .json({ message: "You already purchased this course" });
    }

    // Agregar el ObjectId del curso al array de cursos del usuario
    user.courses.push(courseId);

    // Incrementar el número de participantes del curso
    course.participants += 1;

    // Guardar los cambios tanto en el usuario como en el curso
    await user.save();
    await course.save();

    res.status(200).json({ message: "Course purchased successfully" });
  } catch (error) {
    console.error("Error purchasing course:", error.message);
    res.status(500).json({ message: "Error purchasing course", error });
  }
};

// Obtener los detalles de un curso por su ID
const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId); // Obtener curso por ID

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    res.status(200).json(course); // Devolver los datos del curso
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { getCourseById };

module.exports = {
  getCourses,
  createCourse,
  buyCourse,
  deleteCourse,
  updateCourse,
  getCourseById,
};
