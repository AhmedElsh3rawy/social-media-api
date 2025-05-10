import type { Request, Response, NextFunction } from "express";
import { asyncWrapper } from "../../utils/asyncWrapper";
import { db } from "../../config/database/db";
import { follows } from "../../config/database/schema";

export const follow = asyncWrapper(
	async (req: Request, res: Response, next: NextFunction) => {
		const followerId = req.user.id;
		const followingId = +req.params.id;
		await db
			.insert(follows)
			.values({ followerId: followerId, followingId: followingId });
		res.status(200).json({ message: "Followed successfully" });
	},
);
