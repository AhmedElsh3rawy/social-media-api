import ImageKit from "imagekit";
import type { NextFunction, Request } from "express";
import fs from "node:fs";
import type { ReadStream } from "node:fs";

const imagekit = new ImageKit({
	publicKey: process.env.IMAGEKIT_PUBLIC_KEY as string,
	privateKey: process.env.IMAGEKIT_PRIVATE_KEY as string,
	urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT as string,
});

export const uploadImage = async (req: Request) => {
	const imgStream: ReadStream = fs.createReadStream(req.file.path);
	const result = await imagekit.upload({
		file: imgStream,
		fileName: req.file.filename,
		tags: ["tag1", "tag2"],
	});

	return result;
};
