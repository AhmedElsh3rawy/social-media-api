import type { Request, Response, NextFunction } from "express";
import { asyncWrapper } from "../../utils/asyncWrapper";
import { db } from "../../config/database/db";
import { users } from "../../config/database/schema/user";
import { eq, like } from "drizzle-orm";
import AppError from "../../utils/appError";
import { uploadImage } from "../../config/image-kit";

export const getAll = asyncWrapper(
	async (req: Request, res: Response, next: NextFunction) => {
		const result = await db.select().from(users);
		if (!result) {
			return next(new AppError("No users yet.", 400));
		}
		res.status(200).json({ data: result });
	},
);

export const getById = asyncWrapper(
	async (req: Request, res: Response, next: NextFunction) => {
		const id = +req.params.id;
		const result = await db.select().from(users).where(eq(users.id, id));
		if (result.length === 0) {
			return next(new AppError("User does not exist.", 400));
		}
		res.status(200).json({ data: result[0] });
	},
);

export const getByEmail = asyncWrapper(
	async (req: Request, res: Response, next: NextFunction) => {
		const email = req.params.email;
		const result = await db.select().from(users).where(eq(users.email, email));
		if (result.length === 0) {
			return next(new AppError("User does not exist.", 400));
		}
		res.status(200).json({ data: result[0] });
	},
);

export const getByName = asyncWrapper(
	async (req: Request, res: Response, next: NextFunction) => {
		const name = req.query.name;
		const result = await db
			.select()
			.from(users)
			.where(like(users.name, `${name}%`));
		if (result.length === 0) {
			return next(new AppError("No user by that name.", 400));
		}
		res.status(200).json({ data: result });
	},
);

export const changeProfilePic = asyncWrapper(
	async (req: Request, res: Response, next: NextFunction) => {
		const id = req.user.id;
		const imageUrl = (await uploadImage(req)).url;
		const result = await db
			.update(users)
			.set({ imageUrl: imageUrl, updatedAt: new Date() })
			.where(eq(users.id, id))
			.returning();
		res.status(200).json({ data: result[0] });
	},
);

export const updateName = asyncWrapper(
	async (req: Request, res: Response, next: NextFunction) => {
		const id = req.user.id;
		const name = req.body.name;
		const result = await db
			.update(users)
			.set({ name: name, updatedAt: new Date() })
			.where(eq(users.id, id))
			.returning();
		res.status(200).json({ data: result[0] });
	},
);

export const updateBio = asyncWrapper(
	async (req: Request, res: Response, next: NextFunction) => {
		const id = req.user.id;
		const bio = req.body.bio;
		const result = await db
			.update(users)
			.set({ bio: bio, updatedAt: new Date() })
			.where(eq(users.id, id))
			.returning();
		res.status(200).json({ data: result[0] });
	},
);
