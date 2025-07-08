import type { Request, Response, NextFunction } from "express";
import { asyncWrapper } from "../../utils/asyncWrapper";
import { db } from "../../config/database/db";
import { follows, users } from "../../config/database/schema";
import { and, eq } from "drizzle-orm";
import AppError from "../../utils/appError";

export const toggleFollow = asyncWrapper(
	async (req: Request, res: Response, next: NextFunction) => {
		const followerId = req.user.id;
		const followingId = +req.params.id;

		if (followerId === followingId) {
			return next(new AppError("You can not follow yourself", 400));
		}

		const existing = await db
			.select()
			.from(follows)
			.where(
				and(
					eq(follows.followerId, followerId),
					eq(follows.followingId, followingId),
				),
			);

		if (existing.length === 0) {
			await db.insert(follows).values({ followerId, followingId });
			return res.status(200).json({ message: "Followed successfully" });
		}

		await db
			.delete(follows)
			.where(
				and(
					eq(follows.followerId, followerId),
					eq(follows.followingId, followingId),
				),
			);

		res.status(200).json({ message: "Unfollowed successfully" });
	},
);
