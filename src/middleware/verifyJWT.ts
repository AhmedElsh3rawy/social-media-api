import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import AppError from "../utils/appError";
import { asyncWrapper } from "../utils/asyncWrapper";
import { verifyAccessToken } from "../utils/jwt";

export const verifyJWT = asyncWrapper(
	async (req: Request, res: Response, next: NextFunction) => {
		const authHeader = req.headers.authorization;
		const token = authHeader?.split(" ")[1];
		if (!token) {
			return next(new AppError("Access Denied. No token provided.", 401));
		}
		const decoded = (await verifyAccessToken(token)) as { id: number };
		req.user = { id: decoded.id };
		next();
	},
);
