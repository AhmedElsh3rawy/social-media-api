import type { Request, Express } from "express";
import type { FileFilterCallback } from "multer";
import multer from "multer";
import path from "node:path";
import fs from "node:fs";
import crypto from "node:crypto";

const storage = multer.diskStorage({
	destination: (req: Request, file: Express.Multer.File, cb) => {
		const basePath = path.join(__dirname, "../../uploads");
		fs.mkdirSync(basePath, { recursive: true });

		let type = "profile";
		if (req.path.startsWith("/api/v1/posts")) type = "post";
		else if (req.path.startsWith("/api/v1/comments")) type = "comment";
		else if (req.path.startsWith("/api/v1/shares")) type = "share";

		let mediaType = "images";
		if (file.mimetype.startsWith("video/")) mediaType = "videos";

		const fullPath =
			type === "profile"
				? path.join(basePath, "profile", "images")
				: path.join(basePath, type, mediaType);
		fs.mkdirSync(fullPath, { recursive: true });

		cb(null, fullPath);
	},
	filename: (_, file: Express.Multer.File, cb) => {
		const uniqueSuffix = `${Date.now()}-${crypto.randomBytes(6).toString("hex")}`;
		const timestamp = new Date().toISOString().replace(/:/g, "-");
		const ext = path.extname(file.originalname);
		cb(null, `${timestamp}_${uniqueSuffix}${ext}`);
	},
});

const fileFilter = (
	req: Request,
	file: Express.Multer.File,
	cb: FileFilterCallback,
) => {
	if (file.mimetype.startsWith("image") || file.mimetype.startsWith("video")) {
		cb(null, true);
	} else {
		cb(new Error("Unsupported file format"));
	}
};

export const upload = multer({ storage, fileFilter });

export const uploadInMemory = multer({ storage: multer.memoryStorage() });
