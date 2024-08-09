require("module-alias/register");

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const config = require("@config/env");
const initRoutes = require("@routes/initRoutes");
const { configure, initErrorHandler } = require("@middleware/middleware");
const { auth } = require("@middleware/jwtAuth");

const app = express();

// Configurar middlewares
configure(app);

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, "public")));

// Redirigir la ruta raíz a /login
app.get("/", (req, res) => {
  res.redirect("/login");
});

// Ruta para la página de inicio de sesión
app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

// Ruta protegida solo para administradores
app.get("/admin", auth, (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).send({ error: "Access denied. Admins only." });
  }
  res.send("Welcome Admin");
});

mongoose
  .connect(config.mongodbUri)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

initRoutes(app);

// Inicializar el manejador de errores
initErrorHandler(app);

const port = config.port || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
