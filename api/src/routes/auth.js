const express = require("express");
const router = express.Router();
const {
  register,
  login,
  verifyToken,
} = require("../controllers/authController");

const { auth } = require("../middleware/jwtAuth");

router.post("/register", register);
router.post("/login", login);
router.get("/verifyToken", verifyToken);

// Ruta protegida solo para administradores
router.get("/admin", auth, (req, res) => {
  // Verificar si el usuario tiene el rol de administrador
  if (req.user.role !== "admin") {
    return res.status(403).send({ error: "Access denied. Admins only." });
  }
  res.send("Welcome Admin");
});

module.exports = router;
