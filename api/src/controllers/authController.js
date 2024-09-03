const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

// Controlador para registrar un nuevo usuario
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // Crear nuevo usuario
    user = new User({ name, email, password });

    // Guardar el usuario en la base de datos
    await user.save();

    res.status(201).json({ msg: "User registered successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Controlador para iniciar sesión
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Incorrect password" });
    }

    // Genera un nuevo token
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token, userId: user._id });
  } catch (err) {
    console.error("Error during login process:", err.message);
    res.status(500).send("Server error");
  }
};

// Controlador para verificar el token JWT
const verifyToken = (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer ", "");

  if (!token) {
    return res.status(401).send({ error: "Access denied. No token provided." });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Adjunta la información del usuario al objeto req
    next(); // Pasa al siguiente middleware o controlador
  } catch (ex) {
    return res.status(400).send({ error: "Invalid token." });
  }
};

module.exports = {
  registerUser,
  login,
  verifyToken,
};
