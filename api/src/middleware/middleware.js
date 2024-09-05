const HttpStatus = require("http-status-codes");
const bodyParser = require("body-parser");
const compression = require("compression");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const express = require("express");
const helmet = require("helmet");
const { AppError } = require("../config/config");
const Logger = require("../utils/Logger");

/**
 * Configura los middlewares de la aplicación.
 * @param {express.Application} app
 */
function configure(app) {
  // Middleware para parsear datos del body
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  // Middleware para analizar las cookies
  app.use(cookieParser());

  // Middleware de compresión
  app.use(compression());

  // Habilitar CORS para permitir cookies entre frontend y backend
  app.use(
    cors({
      origin: "http://localhost:5173", // Reemplaza con el dominio de tu frontend en producción
      credentials: true, // Permitir el envío de cookies de autenticación
      methods: ["GET", "POST", "PUT", "DELETE"], // Métodos permitidos
      allowedHeaders: ["Content-Type", "Authorization"], // Encabezados permitidos
    })
  );

  // Configurar Content Security Policy con Helmet
  app.use(
    helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: ["'self'"],
        imgSrc: ["'self'", "http://localhost:3000"],
        connectSrc: ["'self'", "http://localhost:3000"],
        scriptSrc: ["'self'", "http://localhost:3000"],
        styleSrc: ["'self'", "http://localhost:3000"],
        fontSrc: ["'self'", "http://localhost:3000"],
        objectSrc: ["'none'"],
        upgradeInsecureRequests: [],
      },
    })
  );
}

/**
 * Inicializa el manejador de errores.
 * @param {express.Application} app
 */
function initErrorHandler(app) {
  app.use((err, req, res, next) => {
    Logger.error(err);
    if (err instanceof AppError) {
      return res.status(err.statusCode).json({
        status: "error",
        message: err.message,
      });
    }
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      status: "error",
      message: "Internal Server Error",
    });
    next(err);
  });
}

module.exports = {
  configure,
  initErrorHandler,
};
