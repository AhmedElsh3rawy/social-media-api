export const logger = (req, res, next) => {
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  const userAgent = req.headers["user-agent"];
  const time = new Date().toISOString();
  const statusCode = res.statusCode;

  console.log(
    `${req.method} ${req.originalUrl} ${statusCode} - ${ip} (${userAgent}) - ${time}`,
    "\n",
  );

  next();
};
