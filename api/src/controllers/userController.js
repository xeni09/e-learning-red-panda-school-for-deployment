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

    // Actualizar name, email y password (cualquier usuario puede hacerlo)
    if (name) user.name = name;
    if (email) user.email = email;

    // Actualizar contraseña solo si está presente y no es vacía
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

    // Administradores pueden modificar el rol
    if (role && req.user.role === "admin") {
      user.role = role;
    } else if (role) {
      return res
        .status(403)
        .json({ msg: "You are not authorized to change roles." });
    }

    await user.save();

    res.json({
      msg: "User updated successfully",
      user: {
        _id: user._id,
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

module.exports = {
  getUser,
  getAllUsers,
  updateUser,
  deleteUser,
};
