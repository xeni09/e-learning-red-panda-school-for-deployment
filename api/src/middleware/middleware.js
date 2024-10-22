const HttpStatus = require("http-status-codes");
const bodyParser = require("body-parser");
const compression = require("compression");
const cookieParser = require("cookie-parser");
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
  console.log("Cookies parsed");

  // Middleware de compresión
  app.use(compression());

  // Configurar Content Security Policy con Helmet
  const isProduction = process.env.NODE_ENV === "production";
  const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
  const backendUrl = process.env.VITE_BACKEND_URL || "http://localhost:3000";
  console.log(`Running in ${isProduction ? "production" : "development"} mode`);

  app.use(
    helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: ["'self'"],
        imgSrc: ["'self'", frontendUrl],
        connectSrc: ["'self'", backendUrl],
        scriptSrc: ["'self'", frontendUrl],
        styleSrc: ["'self'", frontendUrl],
        fontSrc: ["'self'", frontendUrl],
        objectSrc: ["'none'"],
        upgradeInsecureRequests: isProduction ? [] : [],
      },
    })
  );
  console.log("Helmet configured");
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
