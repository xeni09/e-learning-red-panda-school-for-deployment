const User = require("../models/User");
const Course = require("../models/Course");
const bcrypt = require("bcrypt");

// Controlador para obtener un usuario por ID
const getUser = async (req, res) => {
  try {
    // Popular los cursos con la información completa
    const user = await User.findById(req.params.id).populate("courses");

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.json(user);
  } catch (err) {
    console.error("Error fetching user:", err.message);
    res.status(500).send("Server error");
  }
};

// Controlador para actualizar un usuario por ID

const updateUser = async (req, res) => {
  const { name, email, password, courses, role } = req.body;

  try {
    // Fetch user by ID
    let user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Update email if it is being changed
    if (email && user.email !== email) {
      if (!validateEmail(email)) {
        return res.status(400).json({ error: "Invalid email format" });
      }
      user.email = email;
    }

    // Update name if it is provided and different
    if (name && user.name !== name) user.name = name;

    // Update password only if provided and different
    if (password && password.trim() !== "") {
      const isSamePassword = await bcrypt.compare(password, user.password);
      if (!isSamePassword) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
      }
    }

    // Allow admin to modify courses
    if (courses && req.user.role === "admin") {
      user.courses = courses;
    } else if (courses) {
      return res
        .status(403)
        .json({ msg: "You are not authorized to modify courses." });
    }

    // Only admin can modify the role
    if (role && req.user.role === "admin") {
      user.role = role;
    } else if (role) {
      return res
        .status(403)
        .json({ msg: "You are not authorized to change roles." });
    }

    // Save the user and return the updated data
    await user.save();
    res.json({
      msg: "User updated successfully",
      user: {
        _id: user._id,
        customId: user.customId, // CustomId should remain unchanged
        name: user.name,
        email: user.email,
        courses: user.courses,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Error updating user:", err.message);
    res.status(500).json({ error: `Internal Server Error: ${err.message}` });
  }
};

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/// Crear un nuevo usuario
const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Validar que no falten campos obligatorios
    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Verificar si el email ya está en uso
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email is already in use" });
    }

    // Hashear la contraseña antes de guardarla
    const hashedPassword = await bcrypt.hash(password, 10);

    // Obtener el último usuario para calcular el próximo customId
    const lastUser = await User.findOne().sort({ customId: -1 });
    const newCustomId = lastUser ? lastUser.customId + 1 : 1;

    // Crear un nuevo usuario
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: role || "user", // Asignar "user" por defecto si no se proporciona un rol
      customId: newCustomId,
    });

    // Guardar al usuario en la base de datos
    await newUser.save();

    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Error creating user" });
  }
};

// Controlador para eliminar un usuario por ID
const deleteUser = async (req, res) => {
  console.log("deleteUser called with ID:", req.params.id);

  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    await user.deleteOne();
    res.json({ msg: "User deleted successfully" });
  } catch (err) {
    console.error("Error deleting user:", err.message);
    res.status(500).send("Server error");
  }
};

// Controlador para obtener todos los usuarios
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find(); // Obtener todos los usuarios
    res.json(users);
  } catch (err) {
    console.error("Error fetching users:", err.message);
    res.status(500).send("Server error");
  }
};

// Controlador para cambiar la contraseña de un usuario
const changeUserPassword = async (req, res) => {
  const { id } = req.params;
  const { newPassword } = req.body;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Hashear la nueva contraseña
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error changing password:", error);
    res.status(500).json({ error: "Server error" });
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
      return res
        .status(400)
        .json({ message: "Course already assigned to this user" });
    }

    // Asignar el curso al usuario
    user.courses.push(courseId);
    await user.save();

    res.status(200).json({ message: "Course assigned successfully", user });
  } catch (error) {
    console.error("Error assigning course:", error);
    res.status(500).json({ message: "Error assigning course", error });
  }
};

const removeCourseFromUser = async (req, res) => {
  const { courseId } = req.params;
  const { userId } = req.body; // Pasar el userId por el body

  try {
    // Buscar al usuario por su ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Verificar si el curso está asignado al usuario
    if (!user.courses.includes(courseId)) {
      return res
        .status(400)
        .json({ message: "Course not assigned to this user" });
    }

    // Eliminar el curso de la lista de cursos del usuario
    user.courses = user.courses.filter(
      (course) => course.toString() !== courseId
    );
    await user.save();

    res.status(200).json({ message: "Course removed successfully", user });
  } catch (error) {
    console.error("Error removing course from user:", error);
    res.status(500).json({ message: "Error removing course", error });
  }
};

module.exports = {
  getUser,
  getAllUsers,
  updateUser,
  createUser,
  deleteUser,
  changeUserPassword,
  assignCourseToUser,
  removeCourseFromUser,
};
