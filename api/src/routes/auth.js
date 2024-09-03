const express = require("express");
const router = express.Router();
const {
  registerUser,
  login,
  verifyToken,
} = require("../controllers/authController");

const { auth } = require("../middleware/jwtAuth");

router.post("/register", registerUser);
router.post("/login", login);
router.get("/verifyToken", verifyToken, (req, res) => {
  res.send("Token is valid");
});

// Ruta protegida solo para administradores
router.get("/admin", auth, (req, res) => {
  // Verificar si el usuario tiene el rol de administrador
  if (req.user.role !== "admin") {
    return res.status(403).send({ error: "Access denied. Admins only." });
  }
  res.send("Welcome Admin");
});

module.exports = router;
