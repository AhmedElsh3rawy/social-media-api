import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";
import * as schema from "./schema.js";

const client = new Client({
  connectionString: process.env.DB_URL,
});

(async () => {
  await client.connect();
})();

export const db = drizzle(client, { schema, logger: true });
