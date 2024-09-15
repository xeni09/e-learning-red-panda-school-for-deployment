const express = require("express");
const router = express.Router();
const {
  getUser,
  createUser,
  getAllUsers,
  changeUserPassword,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const { auth, authorize } = require("../middleware/jwtAuth");

// Ruta para obtener todos los usuarios
router.get("/", auth, authorize(["admin"]), getAllUsers);

// Obtener perfil de usuario (cualquier usuario autenticado puede ver su propio perfil)
router.get("/user/:id", auth, getUser);

// Crear un nuevo usuario (solo los administradores pueden crear usuarios)
router.post("/", auth, authorize(["admin"]), createUser); // Añadir esta ruta

// Ruta para cambiar la contraseña de un usuario (autorización requerida)
router.put(
  "/user/:id/change-password",
  auth,
  authorize(["admin"]),
  changeUserPassword
);

// Permitir a un usuario editar su propio perfil o a un admin editar cualquier perfil
router.put(
  "/user/:id",
  auth,
  (req, res, next) => {
    // Permitir que el usuario edite su propio perfil o que el administrador edite cualquier perfil
    if (req.user._id === req.params.id || req.user.role === "admin") {
      next();
    } else {
      return res.status(403).json({
        error:
          "Access denied. You can only update your own profile, or you need admin privileges.",
      });
    }
  },
  updateUser
);

// Solo los administradores pueden eliminar usuarios
router.delete("/user/:id", auth, authorize(["admin"]), deleteUser);

module.exports = router;
