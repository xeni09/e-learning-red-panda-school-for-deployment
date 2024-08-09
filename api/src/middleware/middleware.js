const HttpStatus = require("http-status-codes");
const bodyParser = require("body-parser");
const compression = require("compression");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const express = require("express");
const helmet = require("helmet");
const { AppError } = require("@config/error");
const Logger = require("@/utils/Logger");

/**
 * @param {express.Application} app
 */
function configure(app) {
  // express middleware
  app.use(
    bodyParser.urlencoded({
      extended: false,
    })
  );
  app.use(bodyParser.json());
  // parse Cookie header and populate req.cookies with an object keyed by the cookie names.
  app.use(cookieParser());
  // returns the compression middleware
  app.use(compression());
  // enable CORS
  app.use(cors());
  // secure apps by setting various HTTP headers
  app.use(helmet());
}

/**
 * @param {express.Application} app
 */
function initErrorHandler(app) {
  // Error handling middleware
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
  });
}

module.exports = {
  configure,
  initErrorHandler,
};
