import { relations } from "drizzle-orm";
import {
	pgTable,
	primaryKey,
	serial,
	integer,
	text,
	timestamp,
	unique,
	varchar,
} from "drizzle-orm/pg-core";
import { posts } from "./post";

export const users = pgTable("users", {
	id: serial("id").primaryKey(),
	name: text("name").notNull(),
	username: varchar("username", { length: 15 }).notNull(),
	email: text("email").notNull().unique(),
	password: text("password").notNull(),
	bio: text("bio"),
	imageUrl: text("image_url"),
	createdAt: timestamp("created_at").$defaultFn(() => new Date()),
	updatedAt: timestamp("updated_at").$defaultFn(() => new Date()),
});

export const usersRelations = relations(users, ({ many }) => ({
	posts: many(posts),
}));
