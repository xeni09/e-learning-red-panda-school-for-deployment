const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
  customId: {
    type: Number,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  teacher: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  participants: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    required: true,
  },
  imageSrc: {
    type: String,
    default: "https://via.placeholder.com/150",
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Course", CourseSchema);
