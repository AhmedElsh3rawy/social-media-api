import { relations } from "drizzle-orm";
import {
	pgTable,
	primaryKey,
	serial,
	integer,
	text,
	timestamp,
} from "drizzle-orm/pg-core";
import { posts } from "./post";

export const users = pgTable("users", {
	id: serial("id").primaryKey(),
	name: text("name").notNull(),
	email: text("email").notNull(),
	password: text("password").notNull(),
	imageUrl: text("image_url"),
	createdAt: timestamp("created_at").$defaultFn(() => new Date()),
	updatedAt: timestamp("updated_at").$defaultFn(() => new Date()),
});

export const usersRelations = relations(users, ({ many }) => ({
	posts: many(posts),
}));
