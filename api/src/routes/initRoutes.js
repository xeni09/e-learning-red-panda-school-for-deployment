const authRoutes = require("./auth");
const userRoutes = require("./users");
const adminRoutes = require("./admin"); // Rutas de administrador
const coursesRoutes = require("./courses"); // Rutas de cursos
const courseSectionRoutes = require("./courseSections"); // Rutas de secciones de cursos
const { auth } = require("../middleware/jwtAuth"); // Importar middleware de autenticación

const initRoutes = (app) => {
  // Inicializar rutas de autenticación y usuario
  app.use("/api/auth", authRoutes);
  app.use("/api/users", userRoutes);

  // Inicializar rutas de administrador (protegidas por autenticación)
  app.use("/api/admin", auth, adminRoutes);

  // Inicializar rutas de cursos (protegidas por autenticación)
  app.use("/api/courses", coursesRoutes);

  // Inicializar rutas de secciones de cursos (protegidas por autenticación)
  app.use("/api/courses", auth, courseSectionRoutes); // El prefijo es el mismo, pero las rutas de secciones están separadas
};

module.exports = initRoutes;
