import { asyncWrapper } from "../../utils/asyncWrapper";
import type { Request, Response, NextFunction } from "express";
import type { LoginBody, RegisterBody } from "./auth.types";
import { db } from "../../config/database/db";
import { users } from "../../config/database/schema/user";
import { eq } from "drizzle-orm";
import { uploadImage } from "../../config/image-kit";
import { hashPassword, comparePasswords } from "../../utils/password";
import {
	generateAccessToken,
	generateRefreshToken,
	verifyRefreshToken,
} from "../../utils/jwt";
import AppError from "../../utils/appError";

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
		const { email, password } = req.body as LoginBody;
		const user = await db.select().from(users).where(eq(users.email, email));
		if (user.length === 0) {
			return next(new AppError("Invalid email or password", 400));
		}
		const matched = await comparePasswords(user[0].password, password);
		if (!matched) {
			return next(new AppError("Invalid email or password", 400));
		}
		const accessToken = await generateAccessToken(user[0].id);
		const refreshToken = await generateRefreshToken(user[0].id);
		res.cookie("refreshToken", refreshToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "strict",
			maxAge: 7 * 24 * 60 * 60 * 1000,
		});
		res.status(200).json({ accessToken });
	},
);

export const refresh = asyncWrapper(
	async (req: Request, res: Response, next: NextFunction) => {
		const token = req.cookies.refreshToken;
		if (!token) {
			return next(new AppError("No token provided.", 403));
		}
		const decoded = (await verifyRefreshToken(token)) as { id: number };
		const user = await db.select().from(users).where(eq(users.id, decoded.id));
		if (user.length === 0) {
			return next(new AppError("You are not allowed.", 401));
		}
		const accessToken = await generateAccessToken(user[0].id);
		res.status(200).json({ accessToken });
	},
);

export const logout = asyncWrapper(
	async (req: Request, res: Response, next: NextFunction) => {
		res.clearCookie("refreshToken", { httpOnly: true, sameSite: "strict" });
		res.status(200).json({ message: "Logged out successfully" });
	},
);
