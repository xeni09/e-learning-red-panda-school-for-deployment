const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../../.env") });
const User = require("../models/User");

const createAdminUser = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    const adminExists = await User.findOne({ email: process.env.ADMIN_EMAIL });
    if (adminExists) {
      console.log("El usuario administrador ya existe");
      return;
    }

    const adminUser = new User({
      name: "Admin",
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD,
      role: "admin",
    });

    await adminUser.save();
    console.log("Usuario administrador creado exitosamente");
  } catch (error) {
    console.error("Error al crear el usuario administrador:", error);
  } finally {
    mongoose.connection.close();
  }
};

createAdminUser();
