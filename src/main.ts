import express from "express";
import type { Express, Request, Response } from "express";

const app: Express = express();

const PORT = (process.env.PORT as unknown as number) || 8080;

app.get("/", (req: Request, res: Response) => {
	res.send("Hello, World!");
});

app.listen(PORT, () => console.log(`[server]: Listening on port: ${PORT}`));
