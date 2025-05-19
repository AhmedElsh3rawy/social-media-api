import { db } from "../../config/database/db";
import { likes } from "../../config/database/schema";
import { and, eq } from "drizzle-orm";
import type { Request, Response, NextFunction } from "express";
import { asyncWrapper } from "../../utils/asyncWrapper";

export const toggleLike = asyncWrapper(
	async (req: Request, res: Response, next: NextFunction) => {
		const id = req.user.id;
		const postId = +req.params.id;
		const result = await db
			.select()
			.from(likes)
			.where(and(eq(likes.userId, id), eq(likes.postId, id)));
		if (result.length === 0) {
			await db.insert(likes).values({ userId: id, postId: postId });
			return res.status(200).json({ message: "Liked" });
		}
		await db
			.delete(likes)
			.where(and(eq(likes.userId, id), eq(likes.postId, postId)));
		res.status(200).json({ message: "Disliked" });
	},
);

export const getAllLikes = asyncWrapper(
	async (req: Request, res: Response, next: NextFunction) => {
		const postId = +req.params.id;
		const result = await db
			.select()
			.from(likes)
			.where(eq(likes.postId, postId));
		res.status(200).json({ data: result });
	},
);
