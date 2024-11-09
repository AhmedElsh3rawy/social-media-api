import { notFound, errorHandler } from "./middleware/errorHandler.js";

export default (app) => {
  // routers
  app.use("*", notFound);
  app.use(errorHandler);
};
