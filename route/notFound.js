const AppError = require("../utils/AppError");

const notFound =
  ("*",
  (req, res, next) => {
    // console.log(req);
    next(
      new AppError(
        `Resourse not found on the ${req.hostname}:3000${req.originalUrl}`,
        404
      )
    );
  });

module.exports = notFound;
