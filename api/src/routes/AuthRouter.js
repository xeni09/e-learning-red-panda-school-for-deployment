const express = require("express");
const router = express.Router();
const { login, verifyToken } = require("../controllers/authController");

router.post("/login", login);

// Ruta protegida solo para administradores
router.get("/admin", verifyToken, (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).send({ error: "Access denied. Admins only." });
  }
  res.send("Welcome Admin");
});

module.exports = router;
