const express = require("express");
const router = express.Router();
const {
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const { auth, authorize } = require("../middleware/jwtAuth"); // Import both `auth` and `authorize`

// Users can get their own profile without role check
router.get("/user/:id", auth, getUser);

// Users can update their own profile without needing a special role
router.put(
  "/user/:id",
  auth,
  (req, res, next) => {
    if (req.user._id !== req.params.id && req.user.role !== "admin") {
      return res
        .status(403)
        .send({
          error:
            "Access denied. You can only update your own profile, or you need admin privileges.",
        });
    }
    next();
  },
  updateUser
);

// Only admins can delete users
router.delete("/user/:id", auth, authorize(["admin"]), deleteUser);

module.exports = router;
