const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const multer = require("multer");
const sharp = require("sharp");
const path = require("path");
const MongoStore = require("connect-mongo");
require("dotenv").config({ path: path.join(__dirname, "../.env") });

const { configure, initErrorHandler } = require("./middleware/middleware");
const { auth } = require("./middleware/jwtAuth");
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

// Configurar multer para almacenar imágenes en memoria temporalmente
const storage = multer.memoryStorage(); // Usamos memoria para procesar antes de guardar
const upload = multer({ storage: storage });

// Middleware para servir los archivos estáticos (como las imágenes)
app.use("/uploads", express.static("public/uploads"));

// Ruta para subir la imagen y procesarla con sharp
app.post("/api/upload", upload.single("courseImage"), async (req, res) => {
  try {
    const filename = `course-${Date.now()}.jpeg`;
    const outputPath = path.join(__dirname, "../public/uploads", filename);

    // Usamos sharp para redimensionar la imagen
    await sharp(req.file.buffer)
      .resize(800, 450) // Redimensiona a 800x450 (horizontal)
      .toFormat("jpeg")
      .jpeg({ quality: 80 }) // Reduce la calidad para optimizar
      .toFile(outputPath);

    res.json({ imageUrl: `/uploads/${filename}` });
  } catch (error) {
    console.error("Error processing image:", error);
    res.status(500).send("Error processing image");
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
      mongoUrl: process.env.MONGODB_URI, // Utilizar la misma URI que conectas a MongoDB
      ttl: 14 * 24 * 60 * 60, // Duración de la sesión (14 días, en este caso)
    }),
    cookie: {
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
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
