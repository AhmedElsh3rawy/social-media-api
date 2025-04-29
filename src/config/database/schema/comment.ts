import { relations } from "drizzle-orm";
import type { AnyPgColumn } from "drizzle-orm/pg-core";
import { pgTable, serial, integer, text, timestamp } from "drizzle-orm/pg-core";
import { users } from "./user";
import { posts } from "./post";

export const comments = pgTable("comments", {
	id: serial("id").primaryKey(),
	content: text("content"),
	imageUrl: text("image_url"),
	authorId: integer("author_id")
		.notNull()
		.references(() => users.id),
	postId: integer("post_id")
		.notNull()
		.references(() => users.id),
	parentCommentId: integer("parent_comment_id").references(
		(): AnyPgColumn => comments.id,
	),
	createdAt: timestamp("created_at").$defaultFn(() => new Date()),
	updatedAt: timestamp("updated_at").$defaultFn(() => new Date()),
});

export const commentsRelationsToPosts = relations(comments, ({ one }) => ({
	post: one(posts, {
		fields: [comments.postId],
		references: [posts.id],
	}),
}));
