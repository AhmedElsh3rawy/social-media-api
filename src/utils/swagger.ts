import swaggerUi from "swagger-ui-express";
import type { Express } from "express";
import YAML from "yamljs";
import path from "node:path";

const swaggerSpec = YAML.load(path.join(__dirname, "../docs/swagger.yaml"));

export const setupSwaggerDocs = (app: Express) => {
	app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
