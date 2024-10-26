const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const MongoStore = require("connect-mongo");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("./config/cloudinaryConfig");
const helmet = require("helmet");

require("dotenv").config({ path: path.join(__dirname, "../.env") });

const { configure, initErrorHandler } = require("./middleware/middleware");
const connectDB = require("./config/db");
const initRoutes = require("./routes/initRoutes");

const app = express();

// Verificar variables de entorno requeridas
if (
  process.env.NODE_ENV !== 'test' &&  // Omitir chequeo en modo test
  (!process.env.SESSION_SECRET ||
   !process.env.JWT_SECRET ||
   !process.env.MONGODB_URI ||
   !process.env.CLOUDINARY_CLOUD_NAME ||
   !process.env.CLOUDINARY_API_KEY ||
   !process.env.CLOUDINARY_API_SECRET)
) {
  throw new Error("Faltan variables de entorno requeridas");
}

app.use(helmet()); // Activa varias configuraciones de seguridad
app.disable("X-Powered-By"); // Desactiva explícitamente el encabezado X-Powered-By

// Servir archivos estáticos
app.use("/assets", express.static(path.join(__dirname, "../../ui/src/assets")));

// Conectar a MongoDB
connectDB();

// Configurar middlewares
configure(app);

// Configurar multer para almacenar imágenes en Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "uploads", // Nombre de la carpeta en Cloudinary donde se almacenarán las imágenes
    allowed_formats: ["jpg", "png", "jpeg"],
    transformation: [{ width: 800, height: 600, crop: "limit" }], // Puedes ajustar esta transformación según tu caso
  },
});

const upload = multer({ storage });

// Middleware para manejar JSON y datos de formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuración de CORS para permitir cookies
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});

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
