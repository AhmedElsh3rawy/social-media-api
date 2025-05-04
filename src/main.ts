import express from "express";
import type { Express, Request, Response } from "express";
import morgan from "morgan";
import { errorHandler, notFound } from "./middleware/errorHandler";
import authRouter from "./modules/auth/auth.router";
import userRouter from "./modules/user/user.router";
import { setupSwaggerDocs } from "./utils/swagger";

const app: Express = express();

const PORT = (process.env.PORT as unknown as number) || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);

app.get("/", (req: Request, res: Response) => {
	res.send("Hello, World!");
});

setupSwaggerDocs(app);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => console.log(`[server]: Listening on Port: ${PORT}`));
