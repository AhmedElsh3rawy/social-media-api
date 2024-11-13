import { notFound, errorHandler } from "./middleware/errorHandler.js";
import { verifyJWT } from "./middleware/verifyJWT.js";
import authRouter from "./router/auth.js";

export default (app) => {
  app.use("/api/v1/auth", authRouter);
  app.use(verifyJWT);
  // all remaining routers here
  app.use("*", notFound);
  app.use(errorHandler);
};
