import { pgTable, integer, primaryKey } from "drizzle-orm/pg-core";
import { users } from "./user";
import { posts } from "./post";
import { comments } from "./comment";

export const postLikes = pgTable(
	"post_likes",
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

export const commentLikes = pgTable(
	"comment_likes",
	{
		userId: integer("user_id")
			.notNull()
			.references(() => users.id, { onDelete: "cascade", onUpdate: "cascade" }),

		commentId: integer("comment_id")
			.notNull()
			.references(() => comments.id, {
				onDelete: "cascade",
				onUpdate: "cascade",
			}),
	},
	(table) => ({
		pk: primaryKey({ columns: [table.userId, table.commentId] }),
	}),
);
