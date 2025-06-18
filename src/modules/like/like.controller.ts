import { db } from "../../config/database/db";
import { postLikes, commentLikes } from "../../config/database/schema";
import { and, eq } from "drizzle-orm";
import type { Request, Response, NextFunction } from "express";
import { asyncWrapper } from "../../utils/asyncWrapper";

export const togglePostLike = asyncWrapper(
	async (req: Request, res: Response, next: NextFunction) => {
		const id = req.user.id;
		const postId = +req.params.id;
		const result = await db
			.select()
			.from(postLikes)
			.where(and(eq(postLikes.userId, id), eq(postLikes.postId, id)));
		if (result.length === 0) {
			await db.insert(postLikes).values({ userId: id, postId: postId });
			return res.status(200).json({ message: "Liked" });
		}
		await db
			.delete(postLikes)
			.where(and(eq(postLikes.userId, id), eq(postLikes.postId, postId)));
		res.status(200).json({ message: "Disliked" });
	},
);

export const getAllPostLikes = asyncWrapper(
	async (req: Request, res: Response, next: NextFunction) => {
		const postId = +req.params.id;
		const result = await db
			.select()
			.from(postLikes)
			.where(eq(postLikes.postId, postId));
		res.status(200).json({ data: result });
	},
);
