import type { Request, Response, NextFunction } from "express";
import type { ZodSchema } from "zod";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";
import AppError from "../utils/appError";

export const validate =
	(schema: ZodSchema, property: "body" | "query" | "params") =>
	async (req: Request, res: Response, next: NextFunction) => {
		const result = await schema.safeParseAsync(req[property]);

		if (!result.success) {
			return next(new AppError(fromZodError(result.error).message, 400));
		}

		req[property] = result.data;
		next();
	};
