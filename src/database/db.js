import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "./schema.js";

const { Client } = pg;
const client = new Client({
  connectionString: process.env.DB_URL,
});

(async () => {
  await client.connect();
})();

export const db = drizzle(client, { schema, logger: true });
