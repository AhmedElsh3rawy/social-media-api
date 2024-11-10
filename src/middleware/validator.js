import { validationResult } from "express-validator";

export const validator = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      statusCode: 400,
      status: "Bad Request",
      message: errors.array(),
    });
  }
  next();
};
