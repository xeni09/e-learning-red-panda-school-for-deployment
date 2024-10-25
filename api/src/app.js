const express = require("express");
const helmet = require("helmet");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const MongoStore = require("connect-mongo");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("./config/cloudinaryConfig");
const csurf = require("csurf");

require("dotenv").config({ path: path.join(__dirname, "../.env") });

const { configure, initErrorHandler } = require("./middleware/middleware");
const connectDB = require("./config/db");
const initRoutes = require("./routes/initRoutes");

const app = express();

// Verificar variables de entorno requeridas
if (
  !process.env.SESSION_SECRET ||
  !process.env.JWT_SECRET ||
  !process.env.MONGODB_URI ||
  !process.env.CLOUDINARY_CLOUD_NAME ||
  !process.env.CLOUDINARY_API_KEY ||
  !process.env.CLOUDINARY_API_SECRET
) {
  throw new Error("Faltan variables de entorno requeridas");
}

// Configuración de Helmet para mejorar la seguridad de headers HTTP
app.use(helmet()); // Activa el middleware Helmet para proteger los headers
app.disable("X-Powered-By"); // Desactiva explícitamente X-Powered-By para ocultar Express

// Servir archivos estáticos con Content Security Policy
app.use(
  "/assets",
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      imgSrc: ["'self'", "https://res.cloudinary.com"], // Cloudinary para imágenes
    },
  }),
  express.static(path.join(__dirname, "../../ui/src/assets"))
);

// Conectar a MongoDB
connectDB();

// Configurar middlewares
configure(app);

// Configurar multer para almacenar imágenes en Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "uploads",
    allowed_formats: ["jpg", "png", "jpeg"],
    transformation: [{ width: 800, height: 600, crop: "limit" }],
  },
});
const upload = multer({ storage });

// Middleware para manejar JSON y datos de formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuración de CORS
const allowedOrigins = [process.env.FRONTEND_URL, "http://localhost:5173"];
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "X-CSRF-TOKEN"],
  })
);

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

// Configuración de CSRF usando cookies
const csrfProtection = csurf({
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  },
});
app.use(csrfProtection);

// Ruta para enviar el token CSRF en una cookie accesible desde el frontend
app.get("/csrf-token", (req, res) => {
  res.cookie("XSRF-TOKEN", req.csrfToken(), {
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  });
  res.status(200).json({ csrfToken: req.csrfToken() });
});

// Inicializar rutas desde initRoutes.js
initRoutes(app);

// Agregar una ruta para la raíz
app.get("/", (req, res) => {
  res.send("Backend funcionando correctamente");
});

// Inicializar el manejador de errores
initErrorHandler(app);

module.exports = app;
