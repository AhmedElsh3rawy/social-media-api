import { pgTable, primaryKey, integer } from "drizzle-orm/pg-core";
import { users } from "./user";

export const follows = pgTable(
	"follows",
	{
		followerId: integer("follower_id")
			.notNull()
			.references(() => users.id, {
				onDelete: "cascade",
				onUpdate: "cascade",
			}),
		followingId: integer("following_id")
			.notNull()
			.references(() => users.id, {
				onDelete: "cascade",
				onUpdate: "cascade",
			}),
	},
	(table) => {
		return {
			pk: primaryKey({ columns: [table.followerId, table.followingId] }),
		};
	},
);
