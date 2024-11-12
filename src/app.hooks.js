import { notFound, errorHandler } from "./middleware/errorHandler.js";
import authRouter from "./router/auth.js";

export default (app) => {
  // routers
  app.use("/api/v1/auth", authRouter);
  app.use("*", notFound);
  app.use(errorHandler);
};
