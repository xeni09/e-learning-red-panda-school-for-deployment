const User = require("../models/User");
const Course = require("../models/Course");
const bcrypt = require("bcrypt");

// Controlador para obtener un usuario por ID
const getUser = async (req, res) => {
  try {
    // Populate the courses array with full course information, not just IDs
    const user = await User.findById(req.params.id).populate({
      path: "courses",
      model: "Course", // Ensure we're populating the right model
      select: "_id name description teacher imageSrc", // Select the fields you need
    });

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

    if (typeof password === "string" && password.trim() !== "") {
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
  const { id } = req.params; // Cambiado de userId a id

  try {
    // Buscar al usuario a eliminar
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Eliminar al usuario de todos los cursos en los que esté inscrito
    await Course.updateMany(
      { students: id },
      {
        $pull: { students: id }, // Eliminar la referencia del usuario
      }
    );

    // Finalmente, eliminar al usuario de la base de datos
    await user.deleteOne();

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error.message);
    res.status(500).json({ message: "Server error" });
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
