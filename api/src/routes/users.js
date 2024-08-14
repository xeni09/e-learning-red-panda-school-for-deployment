const express = require("express");
const router = express.Router();
const {
  getUser,
  updateUser,
  registerUser,
} = require("../controllers/userController");
const { verifyToken } = require("../controllers/authController");

// Rutas de usuario con ID
router.get("/user/:id", verifyToken, getUser);
router.put("/user/:id", verifyToken, updateUser);

// Ruta de registro de usuario
router.post("/register", registerUser);

module.exports = router;
