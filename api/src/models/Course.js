const mongoose = require("mongoose");

const SectionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  videoUrl: {
    type: String,
    validate: {
      validator: function (v) {
        return /^https?:\/\/.*/.test(v);
      },
      message: (props) => `${props.value} is not a valid URL!`,
    },
  },
  thumbnail: {
    type: String,
    required: false,
  },
});

const CourseSchema = new mongoose.Schema({
  customId: { type: Number, unique: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  teacher: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true, min: [0, "Price must be positive"] },
  imageSrc: {
    type: String,
    default: "https://via.placeholder.com/150",
    required: true,
  },
  sections: [SectionSchema],
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

module.exports = mongoose.model("Course", CourseSchema);
