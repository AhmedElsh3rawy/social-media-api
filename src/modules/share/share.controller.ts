import type { Request, Response, NextFunction } from "express";
import { db } from "../../config/database/db";
import { shares } from "../../config/database/schema";
import { asyncWrapper } from "../../utils/asyncWrapper";
import { eq } from "drizzle-orm";
import { ownsShare } from "../../utils/ownsX";
import AppError from "../../utils/appError";
import { CreateShareBody, UpdateShareBody } from "./share.types";

export const createShare = asyncWrapper(
	async (req: Request, res: Response, next: NextFunction) => {
		const { content, imageUrl, authorId, postId } = req.body as CreateShareBody;

		const newShare = await db
			.insert(shares)
			.values({
				content,
				imageUrl,
				authorId,
				postId,
			})
			.returning();

		res.status(201).json({
			success: true,
			data: newShare[0],
		});
	},
);

export const updateShare = asyncWrapper(
	async (req: Request, res: Response, next: NextFunction) => {
		const shareId = parseInt(req.params.id);
		const { content, imageUrl } = req.body as UpdateShareBody;

		const isOwner = await ownsShare(req.user.id, shareId);
		if (!isOwner) {
			return next(new AppError("You do not own this share.", 403));
		}
		const updatedShare = await db
			.update(shares)
			.set({
				content,
				imageUrl,
				updatedAt: new Date(),
			})
			.where(eq(shares.id, shareId))
			.returning();

		if (updatedShare.length === 0) {
			return res.status(404).json({
				success: false,
				message: "Share not found",
			});
		}

		res.status(200).json({
			success: true,
			data: updatedShare[0],
		});
	},
);

export const deleteShare = asyncWrapper(
	async (req: Request, res: Response, next: NextFunction) => {
		const shareId = +req.params.id;
		const isOwner = await ownsShare(req.user.id, shareId);
		if (!isOwner) {
			return next(new AppError("You do not own this share.", 403));
		}
		const deletedShare = await db
			.delete(shares)
			.where(eq(shares.id, shareId))
			.returning();

		if (deletedShare.length === 0) {
			return res.status(404).json({
				success: false,
				message: "Share not found",
			});
		}

		res.status(200).json({
			success: true,
			message: "Share deleted successfully",
			data: deletedShare[0],
		});
	},
);
