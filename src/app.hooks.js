import { notFound, errorHandler } from "./middleware/errorHandler.js";
import { verifyJWT } from "./middleware/verifyJWT.js";
import authRouter from "./router/auth.js";
import userRouter from "./router/user.js";
import followRouter from "./router/follow.js";

export default (app) => {
  app.use("/api/v1/auth", authRouter);
  app.use(verifyJWT);
  app.use("/api/v1/users", userRouter);
  app.use("/api/v1", followRouter);
  app.use("*", notFound);
  app.use(errorHandler);
};
