import { pgTable, integer, text, primaryKey } from "drizzle-orm/pg-core";
import { users } from "./user";

export const likes = pgTable(
	"likes",
	{
		userId: integer("user_id")
			.notNull()
			.references(() => users.id, { onDelete: "cascade", onUpdate: "cascade" }),
		targetId: integer("target_id").notNull(),
		type: text("type").notNull(),
	},
	(table) => ({
		pk: primaryKey({ columns: [table.userId, table.targetId, table.type] }),
	}),
);
