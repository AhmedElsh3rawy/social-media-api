import { eq } from "drizzle-orm";
import { db } from "../config/database/db";
import { posts } from "../config/database/schema";

export const ownsPost = async (userId: number, postId: number) => {
	const result = await db.select().from(posts).where(eq(posts.id, postId));
	return result.length === 0 ? false : result[0].authorId === userId;
};
