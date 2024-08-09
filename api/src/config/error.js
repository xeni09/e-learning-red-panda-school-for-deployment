// Define la clase AppError
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

// Define la función sendHttpError
const sendHttpError = (res, error) => {
  res.status(error.statusCode).json({
    status: error.status,
    message: error.message,
  });
};

// Función para manejar errores en desarrollo
const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
    error: err,
  });
};

// Función para manejar errores en producción
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

// Función para inicializar el manejador de errores
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

module.exports = {
  AppError,
  sendHttpError,
  initErrorHandler,
};
