const User = require("../models/User");

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
  const { name, email, password, courses } = req.body;

  try {
    // Buscar usuario por ID
    let user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    if (name) user.name = name;
    if (email) user.email = email;
    if (courses) user.courses = courses;

    if (password) {
      user.password = password; // Se actualizará y se hasheará automáticamente por el middleware
    }

    await user.save();

    res.json({
      msg: "User updated successfully",
      user: {
        id: user._id,
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

module.exports = {
  getUser,
  updateUser,
  deleteUser,
};
