import { asyncWrapper } from "../../utils/asyncWrapper";
import type { Request, Response, NextFunction } from "express";
import type { LoginBody, RegisterBody } from "./auth.types";
import { db } from "../../config/database/db";
import { users } from "../../config/database/schema/user";
import { uploadImage } from "../../config/image-kit";
import { hashPassword, comparePasswords } from "../../utils/password";

export const register = asyncWrapper(
	async (req: Request, res: Response, next: NextFunction) => {
		const user = req.body as RegisterBody;
		const data: RegisterBody = {
			name: user.name,
			email: user.email,
			password: await hashPassword(user.password),
		};
		if (req.file) {
			data.imageUrl = (await uploadImage(req)).url;
		}
		const result = await db.insert(users).values(data).returning();
		res.status(201).json({ data: result[0] });
	},
);

export const login = asyncWrapper(
	async (req: Request, res: Response, next: NextFunction) => {
		const data = req.body as LoginBody;
	},
);
