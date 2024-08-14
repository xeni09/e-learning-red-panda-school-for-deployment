const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

// Controlador para el registro de usuarios
const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    user = new User({ name, email, password });

    await user.save();

    res.status(201).json({ msg: "User registered successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Controlador para el inicio de sesión de usuarios
const login = async (req, res) => {
  const { email, password } = req.body;

  // Verificar credenciales de prueba
  if (
    email === process.env.TEST_USER_EMAIL &&
    password === process.env.TEST_USER_PASSWORD
  ) {
    const token = jwt.sign(
      { email: process.env.TEST_USER_EMAIL, role: "test" },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    return res.json({ token });
  }

  try {
    console.log("Buscando usuario por email:", email);
    const user = await User.findOne({ email });
    if (!user) {
      console.log("Usuario no encontrado");
      return res.status(401).send({ error: "Invalid credentials" });
    }

    console.log("Usuario encontrado:", user);
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("Contraseña incorrecta");
      return res.status(401).send({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    console.log("Login exitoso, token generado");
    res.json({ token });
  } catch (err) {
    console.error("Error en el proceso de login:", err.message);
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
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send({ error: "Invalid token." });
  }
};

module.exports = {
  register,
  login,
  verifyToken,
};
