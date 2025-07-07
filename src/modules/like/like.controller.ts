import { db } from "../../config/database/db";
import { likes } from "../../config/database/schema/like";
import { and, eq } from "drizzle-orm";
import type { Request, Response, NextFunction } from "express";
import { asyncWrapper } from "../../utils/asyncWrapper";

export const toggleLike = asyncWrapper(
	async (req: Request, res: Response, next: NextFunction) => {
		const userId = req.user.id;
		const targetId = +req.params.id;
		const type = req.params.type;

		if (!["post", "comment", "share"].includes(type)) {
			return res.status(400).json({ message: "Invalid like type" });
		}

		const result = await db
			.select()
			.from(likes)
			.where(and(eq(likes.userId, userId), eq(likes.targetId, targetId)));
		if (result.length === 0) {
			await db.insert(likes).values({ userId, targetId, type });
			return res.status(200).json({ message: "Liked" });
		}
		await db
			.delete(likes)
			.where(and(eq(likes.userId, userId), eq(likes.targetId, targetId)));
		res.status(200).json({ message: "Disliked" });
	},
);

export const getAllLikes = asyncWrapper(
	async (req: Request, res: Response, next: NextFunction) => {
		const targetId = +req.params.id;
		const result = await db
			.select()
			.from(likes)
			.where(eq(likes.targetId, targetId));
		res.status(200).json({ data: result });
	},
);
