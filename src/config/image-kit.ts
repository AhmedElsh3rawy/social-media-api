import ImageKit from "imagekit";
import type { Request } from "express";
import fs from "node:fs";
import type { ReadStream } from "node:fs";

const imagekit = new ImageKit({
	publicKey: process.env.IMAGEKIT_PUBLIC_KEY as string,
	privateKey: process.env.IMAGEKIT_PRIVATE_KEY as string,
	urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT as string,
});

export const uploadImage = async (req: Request) => {
	if (!req.file) {
		throw new Error("No file provided for upload");
	}

	const filePath = req.file.path;
	const fileName = req.file.filename;

	const imgStream: ReadStream = fs.createReadStream(filePath);

	const result = await imagekit.upload({
		file: imgStream,
		fileName,
		tags: ["user-upload"],
	});

	fs.unlink(filePath, (err) => {
		if (err) console.error("Error deleting file:", err);
	});

	return result;
};
