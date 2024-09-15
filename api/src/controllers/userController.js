const User = require("../models/User");
const bcrypt = require("bcryptjs");

// Controlador para obtener un usuario por ID
const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
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
    // Buscar usuario por ID
    let user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Validar formato del email si se intenta actualizar
    if (email && !validateEmail(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    // Actualizar name, email y password (sin permitir modificar el customId)
    if (name) user.name = name;
    if (email) user.email = email;

    if (password && password.trim() !== "") {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    // Administradores pueden modificar los cursos manualmente
    if (courses && req.user.role === "admin") {
      user.courses = courses;
    } else if (courses) {
      return res
        .status(403)
        .json({ msg: "You are not authorized to modify courses." });
    }

    // Solo los administradores pueden cambiar el rol del usuario
    if (role && req.user.role === "admin") {
      user.role = role;
    } else if (role) {
      return res
        .status(403)
        .json({ msg: "You are not authorized to change roles." });
    }

    await user.save();

    // Enviar la respuesta con los datos actualizados, sin modificar el customId
    res.json({
      msg: "User updated successfully",
      user: {
        _id: user._id,
        customId: user.customId, // No se permite modificar el customId
        name: user.name,
        email: user.email,
        courses: user.courses,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Error updating user:", err.message);
    res.status(500).send("Server error");
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

module.exports = {
  getUser,
  getAllUsers,
  updateUser,
  createUser,
  deleteUser,
  changeUserPassword,
};
