import { pgTable, integer, primaryKey } from "drizzle-orm/pg-core";
import { users } from "./user";
import { posts } from "./post";

export const likes = pgTable(
	"likes",
	{
		userId: integer("user_id")
			.notNull()
			.references(() => users.id, { onDelete: "cascade", onUpdate: "cascade" }),

		postId: integer("post_id")
			.notNull()
			.references(() => posts.id, { onDelete: "cascade", onUpdate: "cascade" }),
	},
	(table) => ({
		pk: primaryKey({ columns: [table.userId, table.postId] }),
	}),
);
