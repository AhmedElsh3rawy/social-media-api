import { relations } from "drizzle-orm";
import { pgTable, serial, integer, text, timestamp } from "drizzle-orm/pg-core";
import { users } from "./user";
import { comments } from "./comment";

export const posts = pgTable("posts", {
	id: serial("id").primaryKey(),
	content: text("content"),
	imageUrl: text("image_url"),
	authorId: integer("author_id")
		.notNull()
		.references(() => users.id),
	createdAt: timestamp("created_at").$defaultFn(() => new Date()),
	updatedAt: timestamp("updated_at").$defaultFn(() => new Date()),
});

export const postsRelationsToUsers = relations(posts, ({ one }) => ({
	author: one(users, {
		fields: [posts.authorId],
		references: [users.id],
	}),
}));

export const postsRelationsToComments = relations(posts, ({ many }) => ({
	posts: many(comments),
}));
