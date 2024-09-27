const Course = require("../models/Course");
const User = require("../models/User");

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
