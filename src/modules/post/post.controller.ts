import type { Request, Response, NextFunction } from "express";
import { db } from "../../config/database/db";
import { asyncWrapper } from "../../utils/asyncWrapper";
import type { CreatePostBody, updatePostBody } from "./post.types";
import { posts } from "../../config/database/schema";
import { uploadImage } from "../../config/image-kit";
import { eq } from "drizzle-orm";
import { ownsPost } from "../../utils/ownsX";
import AppError from "../../utils/appError";

export const createPost = asyncWrapper(
	async (req: Request, res: Response, next: NextFunction) => {
		const data = req.body as CreatePostBody;
		data.authorId = req.user.id;
		if (req.file) {
			data.imageUrl = (await uploadImage(req)).url;
		}
		const result = await db.insert(posts).values(data).returning();
		res.status(200).json({ data: result[0] });
	},
);

export const updatePost = asyncWrapper(
	async (req: Request, res: Response, next: NextFunction) => {
		const id = +req.params.id;
		const isOwner = await ownsPost(req.user.id, id);
		if (!isOwner) {
			return next(new AppError("You do not own this post.", 403));
		}
		const data = req.body as updatePostBody;
		if (req.file) {
			data.imageUrl = (await uploadImage(req)).url;
		}
		const result = await db
			.update(posts)
			.set({
				...data,
				updatedAt: new Date(),
			})
			.where(eq(posts.id, id))
			.returning();
		res.status(200).json({ data: result[0] });
	},
);

export const deletePost = asyncWrapper(
	async (req: Request, res: Response, next: NextFunction) => {
		const id = +req.params.id;
		const isOwner = await ownsPost(req.user.id, id);
		if (!isOwner) {
			return next(new AppError("You do not own this post.", 403));
		}
		await db.delete(posts).where(eq(posts.id, id));
		res.status(200).json({ message: "Post was deleted successfully." });
	},
);
