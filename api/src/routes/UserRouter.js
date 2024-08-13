const express = require("express");
const router = express.Router();
const { getUser, updateUser } = require("../controllers/userController");
const { verifyToken } = require("../controllers/authController");

router.get("/user", verifyToken, getUser);
router.put("/user", verifyToken, updateUser);

module.exports = router;
