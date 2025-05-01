import ImageKit from "imagekit";

const imagekit = new ImageKit({
	publicKey: process.env.IMAGEKIT_PUBLIC_KEY as string,
	privateKey: process.env.IMAGEKIT_PRIVAT_KEY as string,
	urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT as string,
});

export const uploadImage = async (req: Request) => {
	const result = await imagekit.upload({
		file: req.file?.buffer as Buffer<ArrayBufferLike>,
		fileName: `${req.file?.filename}.png`,
		tags: ["tag1", "tag2"],
	});

	return result;
};
