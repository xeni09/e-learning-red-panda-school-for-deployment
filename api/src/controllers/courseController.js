const Course = require("../models/Course");

// Obtener todos los cursos
const getCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    console.error("Error fetching courses:", error.message);
    res.status(500).send("Server error");
  }
};

// Crear un nuevo curso
const createCourse = async (req, res) => {
  const { name, category, teacher, description, participants, price } =
    req.body;

  try {
    const newCourse = new Course({
      name,
      category,
      teacher,
      description,
      participants,
      price,
    });

    await newCourse.save();
    res.status(201).json(newCourse);
  } catch (error) {
    console.error("Error creating course:", error.message);
    res.status(500).send("Server error");
  }
};

module.exports = {
  getCourses,
  createCourse,
};
