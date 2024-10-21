const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const MongoStore = require("connect-mongo");
require("dotenv").config({ path: path.join(__dirname, "../.env") });

const { configure, initErrorHandler } = require("./middleware/middleware");
const connectDB = require("./config/db");
const initRoutes = require("./routes/initRoutes");

const app = express();

// Verificar variables de entorno requeridas
if (
  !process.env.SESSION_SECRET ||
  !process.env.JWT_SECRET ||
  !process.env.ADMIN_EMAIL ||
  !process.env.ADMIN_PASSWORD ||
  !process.env.MONGODB_URI
) {
  throw new Error("Faltan variables de entorno requeridas");
}

// Servir archivos estáticos
app.use("/assets", express.static(path.join(__dirname, "../../ui/src/assets")));

// Conectar a MongoDB
connectDB();

// Configurar middlewares
configure(app);

// Configurar multer para almacenar imágenes directamente en el disco
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../public/uploads")); // Guardar las imágenes en /public/uploads
  },
  filename: (req, file, cb) => {
    const filename = `course-${Date.now()}${path.extname(file.originalname)}`;
    cb(null, filename);
  },
});
const upload = multer({ storage: storage });

// Configuración de multer para imágenes de secciones
const sectionStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../public/uploads/sections")); // Guardar las imágenes de secciones en /public/uploads/sections
  },
  filename: (req, file, cb) => {
    const filename = `section-${Date.now()}${path.extname(file.originalname)}`;
    cb(null, filename);
  },
});

const sectionUpload = multer({ storage: sectionStorage });

// Middleware para servir los archivos estáticos (como las imágenes)
app.use("/uploads", express.static(path.join(__dirname, "../public/uploads")));

// Ruta para subir la imagen
app.post("/api/upload", upload.single("courseImage"), async (req, res) => {
  try {
    const filename = req.file.filename;
    const imageUrl = `/uploads/${filename}`;

    res.json({ imageUrl });
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).send("Error uploading image");
  }
});

// Middleware para manejar JSON y datos de formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuración de CORS para permitir cookies
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Habilitar preflight (solicitudes OPTIONS) para todas las rutas
app.options("*", cors());

// Middleware para analizar cookies
app.use(cookieParser());

// Configurar sesiones con almacenamiento en MongoDB
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
      ttl: 14 * 24 * 60 * 60,
    }),
    cookie: {
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      httpOnly: true,
    },
  })
);

// Inicializar rutas desde initRoutes.js
initRoutes(app);

// Agregar una ruta para la raíz
app.get("/", (req, res) => {
  res.send("Backend funcionando correctamente");
});

// Inicializar el manejador de errores
initErrorHandler(app);

module.exports = app;
