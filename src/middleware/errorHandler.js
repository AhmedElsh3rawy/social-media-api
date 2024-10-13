import APIError from "../utils/APIError.js";

export const errorHandler = (err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    statusCode: err.statusCode || 500,
    status: err.statusText || "Internal Server Error",
    message: err.message,
    stack: err.stack,
  });
};

export const notFound = (req, res, next) => {
  next(new APIError("NOT FOUND", 404));
};
