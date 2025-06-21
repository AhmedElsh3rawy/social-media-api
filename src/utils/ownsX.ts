import { eq } from "drizzle-orm";
import { db } from "../config/database/db";
import { posts, shares, comments } from "../config/database/schema";

export const ownsPost = async (userId: number, postId: number) => {
	const result = await db.select().from(posts).where(eq(posts.id, postId));
	return result.length === 0 ? false : result[0].authorId === userId;
};

export const ownsShare = async (userId: number, shareId: number) => {
	const result = await db.select().from(shares).where(eq(shares.id, shareId));
	return result.length === 0 ? false : result[0].authorId === userId;
};

export const ownsComment = async (userId: number, commentId: number) => {
	const result = await db
		.select()
		.from(comments)
		.where(eq(comments.id, commentId));
	return result.length === 0 ? false : result[0].authorId === userId;
};
