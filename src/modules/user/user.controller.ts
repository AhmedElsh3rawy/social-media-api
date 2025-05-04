import type { Request, Response, NextFunction } from "express";
import { asyncWrapper } from "../../utils/asyncWrapper";
import { db } from "../../config/database/db";
import { users } from "../../config/database/schema/user";
import { eq } from "drizzle-orm";
import AppError from "../../utils/appError";

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
		if (!result) {
			return next(new AppError("User does not exist.", 400));
		}
		res.status(200).json({ data: result[0] });
	},
);
