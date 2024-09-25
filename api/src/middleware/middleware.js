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
  console.log(`Running in ${isProduction ? "production" : "development"} mode`);

  app.use(
    helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: ["'self'"],
        imgSrc: [
          "'self'",
          isProduction
            ? "https://e-learning-red-panda-school.vercel.app"
            : "http://localhost:3000",
        ],
        connectSrc: [
          "'self'",
          isProduction
            ? "https://e-learning-red-panda-school-production.up.railway.app"
            : "http://localhost:3000",
        ],
        scriptSrc: [
          "'self'",
          isProduction
            ? "https://e-learning-red-panda-school.vercel.app"
            : "http://localhost:3000",
        ],
        styleSrc: [
          "'self'",
          isProduction
            ? "https://e-learning-red-panda-school.vercel.app"
            : "http://localhost:3000",
        ],
        fontSrc: [
          "'self'",
          isProduction
            ? "https://e-learning-red-panda-school.vercel.app"
            : "http://localhost:3000",
        ],
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
