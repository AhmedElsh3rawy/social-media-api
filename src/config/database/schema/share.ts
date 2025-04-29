import { pgTable, serial, integer, text, timestamp } from "drizzle-orm/pg-core";
import { users } from "./user";
import { posts } from "./post";

export const shares = pgTable("shares", {
	id: serial("id").primaryKey(),
	content: text("content"),
	imageUrl: text("image_url"),
	authorId: integer("author_id")
		.notNull()
		.references(() => users.id),

	postId: integer("post_id")
		.notNull()
		.references(() => posts.id),
	createdAt: timestamp("created_at").$defaultFn(() => new Date()),
	updatedAt: timestamp("updated_at").$defaultFn(() => new Date()),
});
