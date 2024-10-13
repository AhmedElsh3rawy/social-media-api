import express from "express";
import { logger } from "./middleware/logger.js";

const app = express();

const PORT = process.env.PORT || 8080;

app.use(logger);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(PORT, () => console.log(`[server]: running on localhost:${PORT}`));
