const Course = require("../models/Course");
const User = require("../models/User");

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

    // Log request body to debug what's coming in
    console.log("Request body:", req.body);

    let imagePath = ""; // Variable for the image (empty by default)

    // Verify if an image was uploaded and assign if it exists
    if (req.file) {
      imagePath = `/uploads/${req.file.filename}`;
    }

    // Check if all required fields are provided
    if (!name || !description || !price || !category || !teacher) {
      return res.status(400).json({
        error: "Validation error",
        details:
          "Missing required fields: name, description, price, category, teacher",
      });
    }

    // Ensure that price is a number
    if (isNaN(price)) {
      return res.status(400).json({
        error: "Validation error",
        details: "Price must be a number",
      });
    }

    // Get the last course to determine the next customId
    const lastCourse = await Course.findOne().sort({ customId: -1 });
    const newCustomId = lastCourse ? lastCourse.customId + 1 : 1;

    // Create the new course
    const newCourse = new Course({
      customId: newCustomId,
      name,
      description,
      price: parseFloat(price), // Ensure price is treated as a float
      category,
      imageSrc: imagePath, // Use the image if it exists
      teacher,
    });

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

// Eliminar un curso por su ID
const deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.params;

    // Buscar el curso por ID
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Eliminar el curso
    await course.deleteOne();

    res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    console.error("Error deleting course:", error.message);
    res.status(500).json({ message: "Error deleting course", error });
  }
};

module.exports = {
  getCourses,
  createCourse,
  buyCourse,
  deleteCourse,
};
