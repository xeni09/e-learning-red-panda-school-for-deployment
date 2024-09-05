const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Definir el esquema de cursos
const courseSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId, // Usar ObjectId si estás referenciando otros documentos
    ref: "Course", // Referencia a otro modelo de curso (si es necesario)
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
});

// Definir el esquema de usuario
const userSchema = new mongoose.Schema({
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
    enum: ["user", "admin"],
    default: "user",
  },
  courses: [courseSchema], // Array de cursos
});

// Middleware para hashear la contraseña antes de guardarla
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Método para comparar contraseñas
userSchema.methods.comparePassword = async function (inputPassword) {
  return await bcrypt.compare(inputPassword, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
