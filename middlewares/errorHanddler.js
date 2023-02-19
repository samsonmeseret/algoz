const AppError = require("../utils/AppError");

const handdleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value._id}.`;
  return new AppError(message, 400);
};

const handdleDuplicateFieldsDB = (err) => {
  const field = err?.errmsg.match(/(["'])(?:\\.|[^\\])*?\1/)[0];
  const message = `Duplicate Field value: ${field}, use different value!`;
  return new AppError(message, 400);
};

const handdleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input Data: ${errors.join(". ")}`;
  return new AppError(message, 400);
};
const handdleJWTTokenError = (err) => {
  // const errors = err.name;
  // const message = "Invalid token! Please sign in again.";
  return new AppError("Invalid token! Please sign in again.", 401);
};

const sendErrorDev = (err, res) => {
  // Developmental stage we need all the errors to see and fix it
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};
const sendErrorPro = (err, res) => {
  // Operational, trusted error: send message to client
  //err.isOperational
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
    // Programming or Other unknown error: don't leak error details
  } else {
    // 1) log error
    console.error("ERROR", err);
    // 2) send generic message
    res.status(500).json({
      status: "error",
      message: "Something went Wrong!",
    });
  }
};
const globalErrorHanddler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  // on the development stage
  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  }
  // this will run on the production stage
  else if (process.env.NODE_ENV === "production") {
    let error = err;
    if (error.name === "CastError") error = handdleCastErrorDB(error);
    if (error.code === 11000) error = handdleDuplicateFieldsDB(error);
    if (error.name === "ValidationError")
      error = handdleValidationErrorDB(error);
    if (error.name === "JsonWebTokenError") error = handdleJWTTokenError(error);
    if (error.name === "TokenExpiredError") error = handdleJWTTokenError(error);

    sendErrorPro(error, res);
  }
};

module.exports = globalErrorHanddler;
