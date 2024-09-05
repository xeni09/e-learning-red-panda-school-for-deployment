const express = require("express");
const router = express.Router();
const {
  registerUser,
  login,
  verifyToken,
  logout,
} = require("../controllers/authController");

const { auth } = require("../middleware/jwtAuth");

// Ruta para registrar un nuevo usuario
router.post("/register", registerUser);

// Ruta para iniciar sesión
router.post("/login", login);

// Ruta para verificar el token JWT y devolver los datos del usuario
router.get("/verifyToken", verifyToken); // Verificación de token

// Ruta para cerrar sesión
router.post("/logout", logout); // Limpiar la cookie del token

// Ruta protegida solo para administradores
router.get("/admin", auth, (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).send({ error: "Access denied. Admins only." });
  }
  res.send("Welcome Admin");
});

module.exports = router;
