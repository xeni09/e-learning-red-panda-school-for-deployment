const express = require("express");
const router = express.Router();
const {
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const { auth } = require("../middleware/jwtAuth"); // Usa el middleware `auth` directamente

// Rutas de usuario con ID, protegidas por el middleware `auth`
router.get("/user/:id", auth, getUser);
router.put("/user/:id", auth, updateUser);
router.delete("/user/:id", auth, deleteUser);

module.exports = router;
