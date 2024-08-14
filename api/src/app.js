const express = require("express");
const session = require("express-session");

const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });

const { configure, initErrorHandler } = require("./middleware/middleware");
const { auth } = require("./middleware/jwtAuth");

const app = express();
const connectDB = require("./config/db");
const initRoutes = require("./routes/initRoutes");

// Verify required environment variables
if (
  !process.env.SESSION_SECRET ||
  !process.env.ADMIN_EMAIL ||
  !process.env.ADMIN_PASSWORD ||
  !process.env.MONGODB_URI
) {
  throw new Error("Missing required environment variables");
}

// Conectar a MongoDB
connectDB();

// Configurar middlewares
configure(app);

// Middleware para manejar JSON y datos de formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configurar sesiones
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: process.env.NODE_ENV === "production" },
  })
);

// Ruta raíz
app.get("/", (req, res) => {
  res.send("Welcome to the API");
});

// Importar y usar rutas
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

// Inicializar rutas adicionales
initRoutes(app);

// Inicializar el manejador de errores
initErrorHandler(app);

module.exports = app;
