import express from "express";
import { logger } from "./middleware/logger.js";
import { notFound, errorHandler } from "./middleware/errorHandler.js";

const app = express();

const PORT = process.env.PORT || 8080;

app.use(logger);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use("*", notFound);
app.use(errorHandler);

app.listen(PORT, () => console.log(`[server]: running on localhost:${PORT}`));
