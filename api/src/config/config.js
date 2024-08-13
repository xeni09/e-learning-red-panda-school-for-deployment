// db.js content
const mongoose = require("mongoose");
require("dotenv").config();

const MONGODB_URI = process.env.MONGODB_URI;

const connectDB = async () => {
  try {
    console.log("Attempting to connect to MongoDB...");
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Could not connect to MongoDB", err);
    process.exit(1);
  }
};

// env.js content
const envConfig = {
  jwtSecret: "defaultsecretkey",
  mongodbUri: "mongodb://localhost:27017/yourdbname",
  port: 3000,
};

// error.js content
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

const sendHttpError = (res, error) => {
  res.status(error.statusCode).json({
    status: error.status,
    message: error.message,
  });
};

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
    error: err,
  });
};

const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.error("ERROR 💥", err);
    res.status(500).json({
      status: "error",
      message: "Something went very wrong!",
    });
  }
};

const initErrorHandler = (app) => {
  app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";

    if (process.env.NODE_ENV === "development") {
      sendErrorDev(err, res);
    } else if (process.env.NODE_ENV === "production") {
      sendErrorProd(err, res);
    }
  });
};

// Exporting all configurations and functions
module.exports = {
  connectDB,
  envConfig,
  AppError,
  sendHttpError,
  initErrorHandler,
};
