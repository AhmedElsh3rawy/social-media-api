import express from "express";
import type { Express, Request, Response } from "express";
import morgan from "morgan";

const app: Express = express();

const PORT = (process.env.PORT as unknown as number) || 8080;

app.use(morgan("dev"));

app.get("/", (req: Request, res: Response) => {
	res.send("Hello, World!");
});

app.listen(PORT, () => console.log(`[server]: Listening on port: ${PORT}`));
