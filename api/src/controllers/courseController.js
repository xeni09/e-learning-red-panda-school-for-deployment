const Course = require("../models/Course");
const User = require("../models/User");
const cloudinary = require("../config/cloudinaryConfig");

// Obtener todos los cursos
const getCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate("teacher", "name");

    // Calcular la cantidad de participantes con la longitud de `students`
    const coursesWithCount = courses.map((course) => ({
      _id: course._id,
      customId: course.customId,
      name: course.name,
      category: course.category,
      teacher: course.teacher,
      description: course.description,
      students: course.students || [],
      price: course.price,
      imageSrc: course.imageSrc,
      sections: course.sections,
      createdAt: course.createdAt,
    }));

    res.json(coursesWithCount);
  } catch (error) {
    console.error("Error fetching courses with user count:", error.message);
    res.status(500).json({ message: "Server error" });
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

    // Subir imagen a Cloudinary y obtener la URL
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "courses",
    });
    const imageUrl = result.secure_url;

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

    // Inicializar el campo students como un array vacío
    const newCourse = new Course({
      customId: newCustomId,
      name,
      description,
      price: parseFloat(price),
      category,
      imageSrc: imageUrl,
      teacher,
      students: [], // Asegurarse de que siempre sea un array
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
    const { name, description, price, category, teacher, sections } = req.body;

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

    // Actualizar las secciones si están presentes
    if (sections) {
      course.sections = sections;
    }

    // Verificar si hay una nueva imagen cargada
    if (req.file) {
      // Eliminar la imagen anterior en Cloudinary si existe
      if (course.imageSrc) {
        const publicId = course.imageSrc.split("/").pop().split(".")[0]; // Extraer el publicId de Cloudinary
        await cloudinary.uploader.destroy(publicId); // Eliminar la imagen en Cloudinary
      }

      // Subir nueva imagen a Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "courses",
      });
      course.imageSrc = result.secure_url; // Actualizar con la nueva URL
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
    const { deleteImage } = req.body;

    // Buscar el curso por su ID
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Verificar que deleteImage y course.imageSrc existen
    console.log("Delete image flag:", deleteImage);
    console.log("Course image source:", course.imageSrc);

    // Eliminar la imagen de Cloudinary si se solicita y existe
    if (deleteImage && course.imageSrc) {
      try {
        const publicId = course.imageSrc.split("/").pop().split(".")[0]; // Extraer el publicId de Cloudinary
        await cloudinary.uploader.destroy(publicId); // Eliminar la imagen en Cloudinary
        console.log("Image deleted from Cloudinary:", course.imageSrc);
      } catch (err) {
        console.error("Error deleting image from Cloudinary:", err.message);
        return res.status(500).json({
          message: "Error deleting image from Cloudinary",
          error: err.message,
        });
      }
    }

    // Eliminar el curso
    await course.deleteOne();
    res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    console.error("Error deleting course:", error.message);
    res.status(500).json({ message: "Error deleting course", error });
  }
};

// Obtener los detalles de un curso por su ID
const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId)
      .populate("teacher", "name") // Populating teacher's name
      .populate("students", "name email"); // Populating students' names and emails

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

const getUsersForCourse = async (req, res) => {
  try {
    const { courseId } = req.params;

    // Encontrar el curso y popular los usuarios
    const course = await Course.findById(courseId).populate(
      "students",
      "name email"
    ); // Solo los campos que quieres mostrar

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Devolver solo la lista de estudiantes
    res.status(200).json(course.students);
  } catch (error) {
    console.error("Error fetching users for course:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// Eliminar un estudiante de un curso
const removeStudentFromCourse = async (req, res) => {
  const { courseId, studentId } = req.params;

  try {
    // Encontrar el curso
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Verificar si el estudiante está en el curso
    if (!course.students.includes(studentId)) {
      return res
        .status(400)
        .json({ message: "Student is not enrolled in this course" });
    }

    // Eliminar al estudiante del curso
    course.students = course.students.filter(
      (student) => student.toString() !== studentId
    );

    // Guardar los cambios en el curso
    await course.save();

    // También eliminar el curso del array de cursos del usuario
    const user = await User.findById(studentId);
    if (user) {
      user.courses = user.courses.filter(
        (course) => course.toString() !== courseId
      );
      await user.save();
    }

    res
      .status(200)
      .json({ message: "Student removed from course successfully" });
  } catch (error) {
    console.error("Error removing student from course:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const assignCourseToUser = async (req, res) => {
  const { courseId } = req.params; // Obtener el ID del curso de los parámetros
  const { userId } = req.body; // Obtener el ID del usuario del cuerpo de la solicitud

  try {
    // Buscar el curso por ID
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Buscar el usuario por su ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Verificar si el curso ya está asignado al usuario
    if (user.courses.includes(courseId)) {
      return res.status(400).json({
        message:
          "Course already assigned to this user, change the email in Step 1",
      });
    }

    // Asignar el curso al usuario
    user.courses.push(courseId);

    // Aumentar el contador de participantes en el curso
    course.students.push(userId); // También agregar el usuario a la lista de estudiantes del curso

    // Guardar los cambios tanto en el usuario como en el curso
    await user.save();
    await course.save();

    // Después de guardar, populamos los estudiantes en el curso para obtener el email
    await course.populate("students", "email name"); // Popular los estudiantes con sus emails y nombres

    res
      .status(200)
      .json({ message: "Course assigned successfully", user, course });
  } catch (error) {
    console.error("Error assigning course:", error);
    res.status(500).json({ message: "Error assigning course", error });
  }
};

// Middleware to check if the user has purchased the course
const hasPurchasedCourse = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const courseId = req.params.courseId;

    // Buscar el usuario y verificar si ya ha comprado el curso
    const user = await User.findById(userId).populate("courses");

    if (!user || !user.courses) {
      return res.status(403).send({ error: "User or courses not found" });
    }

    const hasCourse = user.courses.some((course) =>
      course._id.equals(courseId)
    );

    if (!hasCourse) {
      return res
        .status(403)
        .send({ error: "You have not purchased this course" });
    }

    next(); // Si el curso está asignado, continúa
  } catch (error) {
    console.error("Error verifying course purchase:", error.message);
    return res.status(500).send({ error: "Internal server error" });
  }
};

// Simular la compra de un curso sin autenticación
const simulateBuyCourse = async (req, res) => {
  try {
    const courseId = "67001dc00f968533a71ee9e7";
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json({ message: "Course added to cart", course });
  } catch (error) {
    console.error("Error adding course to cart:", error.message);
    res.status(500).json({ message: "Error adding course to cart", error });
  }
};

// Confirmar la compra de un curso (requiere autenticación)
const buyCourse = async (req, res) => {
  try {
    const userId = req.user._id; // Usuario autenticado

    // ID del curso fijo a asignar
    const courseId = "67001dc00f968533a71ee9e7";

    // Buscar el curso por el ID fijo
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const user = await User.findById(userId);
    if (user.courses.includes(courseId)) {
      return res
        .status(400)
        .json({ message: "You already purchased this course" });
    }

    // Agregar curso al usuario y aumentar participantes
    user.courses.push(courseId);
    course.students.push(userId);

    await user.save();
    await course.save();

    res.status(200).json({ message: "Course purchased successfully" });
  } catch (error) {
    console.error("Error purchasing course:", error.message);
    res.status(500).json({ message: "Error purchasing course", error });
  }
};

module.exports = {
  getCourses,
  createCourse,
  updateCourse,
  deleteCourse,
  getCourseById,
  getUsersForCourse,
  removeStudentFromCourse,
  assignCourseToUser,
  hasPurchasedCourse,
  simulateBuyCourse,
  buyCourse,
};
