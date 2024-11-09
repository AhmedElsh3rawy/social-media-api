import express from "express";
import appSetup from "./app.setup.js";
import appHooks from "./app.hooks.js";

const app = express();

const PORT = process.env.PORT || 8080;

appSetup(app);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

appHooks(app);

app.listen(PORT, () => console.log(`[server]: running on localhost:${PORT}`));
