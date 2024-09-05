const express = require("express");
const router = express.Router();
const {
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const { verifyToken } = require("../controllers/authController");

// Rutas de usuario con ID
router.get("/user/:id", verifyToken, getUser);
router.put("/user/:id", verifyToken, updateUser);
router.delete("/user/:id", verifyToken, deleteUser);

module.exports = router;
