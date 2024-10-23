const express = require("express");
const router = express.Router();
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
const cloudinary = require("../config/cloudinaryConfig");

const {
  getCourses,
  createCourse,
  buyCourse,
  deleteCourse,
  updateCourse,
  getCourseById,
  getUsersForCourse,
  removeStudentFromCourse,
  assignCourseToUser,
  hasPurchasedCourse,
  simulateBuyCourse,
} = require("../controllers/courseController");

const { auth, authorize } = require("../middleware/jwtAuth");

// Cloudinary storage configuration
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "courses", // Folder in Cloudinary
    allowed_formats: ["jpg", "png", "jpeg"], // Allowed formats for course images
  },
});

const upload = multer({ storage });

// Public route for simulating course purchase
router.get("/simulate-buy", simulateBuyCourse);

// Route to manage courses (admin only)
router.get("/", auth, authorize(["admin"]), getCourses);

// Create a new course with image upload (admin only)
router.post(
  "/",
  auth,
  authorize(["admin"]),
  upload.single("courseImage"),
  createCourse
);

// Delete a course (admin only)
router.delete("/:courseId", auth, authorize(["admin"]), deleteCourse);

// Remove a student from a course (admin only)
router.delete(
  "/:courseId/students/:studentId",
  auth,
  authorize(["admin"]),
  removeStudentFromCourse
);

// Update a course with image upload (admin only)
router.put(
  "/:courseId",
  auth,
  authorize(["admin"]),
  upload.single("courseImage"),
  updateCourse
);

// Get course details by ID (admin only)
router.get("/:courseId", auth, authorize(["admin"]), getCourseById);

// Get users enrolled in a course (admin only)
router.get(
  "/:courseId/students",
  auth,
  authorize(["admin"]),
  getUsersForCourse
);

// Assign a course to a user
router.put("/:courseId/assign", auth, assignCourseToUser);

// Access the enrolled course (for authenticated users who purchased the course)
router.get(
  "/:courseId/enrolled",
  auth, // User must be authenticated
  hasPurchasedCourse, // Check if the user has purchased the course
  getCourseById
);

// Protected route for confirming the purchase (requires authentication)
router.post("/confirm-buy", auth, buyCourse);

// Assign course to user (admin route)
router.post("/:courseId/assign-user", assignCourseToUser);

module.exports = router;
