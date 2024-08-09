const express = require("express");
const { auth } = require("@middleware/jwtAuth");
const User = require("@models/User");

const router = express.Router();

// Obtener información del usuario
router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user.userId);
  res.json(user);
});

module.exports = router;
