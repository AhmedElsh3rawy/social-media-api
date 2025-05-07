import jwt from "jsonwebtoken";

export const generateAccessToken = async (userId: number) => {
	return await jwt.sign(
		{ id: userId },
		process.env.ACCESS_TOKEN_SECRET as string,
		{ expiresIn: "3m" },
	);
};

export const generateRefreshToken = async (userId: number) => {
	return await jwt.sign(
		{ id: userId },
		process.env.REFRESH_TOKEN_SECRET as string,
		{ expiresIn: "30d" },
	);
};

export const verifyAccessToken = async (token: string) => {
	return await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string);
};

export const verifyRefreshToken = async (token: string) => {
	return await jwt.verify(token, process.env.REFRESH_TOKEN_SECRET as string);
};
