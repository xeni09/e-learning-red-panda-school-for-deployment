const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Esquema de usuario
const userSchema = new mongoose.Schema({
  customId: {
    type: Number,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "admin", "teacher"],
    default: "user",
  },
  courses: [
    {
      type: mongoose.Schema.Types.ObjectId, // Solo el ObjectId del curso
      ref: "Course", // Referencia al modelo Course
    },
  ],
});

// Middleware para hashear la contraseña antes de guardar
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Método para comparar contraseñas
userSchema.methods.comparePassword = async function (inputPassword) {
  return await bcrypt.compare(inputPassword, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
