import type { Request, Response, NextFunction } from "express";
import { db } from "../../config/database/db";
import { asyncWrapper } from "../../utils/asyncWrapper";
import type { CreatePostBody } from "./post.types";
import { posts } from "../../config/database/schema";
import { uploadImage } from "../../config/image-kit";

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
