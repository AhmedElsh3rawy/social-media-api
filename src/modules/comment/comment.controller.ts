import type { Request, Response, NextFunction } from "express";
import { asyncWrapper } from "../../utils/asyncWrapper";
import { db } from "../../config/database/db";
import { comments } from "../../config/database/schema";
import type { CreateCommentBody } from "./comment.types";
import { ownsComment } from "../../utils/ownsX";
import AppError from "../../utils/appError";
import { and, eq } from "drizzle-orm";

export const createComment = asyncWrapper(
	async (req: Request, res: Response, next: NextFunction) => {
		const data = req.body as CreateCommentBody;
		data.authorId = req.user.id;
		const result = await db.insert(comments).values(data).returning();
		res.status(200).json({ data: result[0] });
	},
);

export const deleteComment = asyncWrapper(
	async (req: Request, res: Response, next: NextFunction) => {
		const commentId = +req.params.id;
		const userId = req.user.id;
		const owner = await ownsComment(userId, commentId);
		if (!owner) {
			return next(new AppError("You do not own the comment", 400));
		}
		await db
			.delete(comments)
			.where(and(eq(comments.id, commentId), eq(comments.authorId, userId)))
			.returning();
		res.status(200).json({ message: "Comment deleted successfully" });
	},
);
