import type { Request, Express } from "express";
import multer from "multer";
import path from "node:path";
import fs from "node:fs";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
	destination: (req: Request, file: Express.Multer.File, cb) => {
		const basePath = path.join(__dirname, "uploads");
		fs.mkdirSync(basePath, { recursive: true });

		const isPost = req.path === "/api/v1/posts";
		const isComment = req.path === "/api/v1/comments";
		const isShare = req.path === "/api/v1/shares";
		const fullPath = path.join(
			basePath,
			isPost ? "post" : isComment ? "comment" : isShare ? "share" : "profile",
		);
		fs.mkdirSync(fullPath, { recursive: true });

		cb(null, fullPath);
	},
	filename: (_, file, cb) => {
		const uniqueSuffix = `${Date.now()}-${crypto.randomBytes(6).toString("hex")}`;
		const timestamp = new Date().toISOString().replace(/:/g, "-");
		const ext = path.extname(file.originalname);
		cb(null, `${timestamp}_${uniqueSuffix}${ext}`);
	},
});

const fileFilter = (req, file, cb) => {
	if (file.mimetype.startsWith("image")) cb(null, true);
	else cb(Error("Unsupported file format"), false);
};

export const upload = multer({ storage, fileFilter });

export const uploadInMemory = multer({ storage: multer.memoryStorage() });
