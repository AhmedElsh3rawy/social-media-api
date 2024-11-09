import { pgTable, serial, integer, text, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull(),
  email: text("email").notNull(),
  password: text("password").notNull(),
  profileImage: text("profile_image"),
  bio: text("bio"),
  createdAt: timestamp("created_at").$defaultFn(() => new Date()),
  updatedAt: timestamp("updated_at").$defaultFn(() => new Date()),
});

// export const posts = pgTable("posts", {
//   id: serial("id").primaryKey(),
//   content: text("content").notNull(),
//   authorId: integer("author_id")
//     .notNull()
//     .references(() => users.id),
// });

// export const tokens = pgTable("tokens", {
//   id: serial("id").primaryKey(),
//   refreshToken: text("refresh_token").notNull(),
//   userId: integer("user_id")
//     .notNull()
//     .references(() => users.id),
// });
