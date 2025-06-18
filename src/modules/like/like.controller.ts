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

export const toggleCommentLike = asyncWrapper(
	async (req: Request, res: Response, next: NextFunction) => {
		const id = req.user.id;
		const commentId = +req.params.id;
		const result = await db
			.select()
			.from(commentLikes)
			.where(and(eq(commentLikes.userId, id), eq(commentLikes.commentId, id)));
		if (result.length === 0) {
			await db
				.insert(commentLikes)
				.values({ userId: id, commentId: commentId });
			return res.status(200).json({ message: "Liked" });
		}
		await db
			.delete(commentLikes)
			.where(
				and(eq(commentLikes.userId, id), eq(commentLikes.commentId, commentId)),
			);
		res.status(200).json({ message: "Disliked" });
	},
);

export const getAllCommentLikes = asyncWrapper(
	async (req: Request, res: Response, next: NextFunction) => {
		const commentId = +req.params.id;
		const result = await db
			.select()
			.from(commentLikes)
			.where(eq(commentLikes.commentId, commentId));
		res.status(200).json({ data: result });
	},
);
