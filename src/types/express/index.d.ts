import * as express from "express";

type UserPayload = {
	id: number;
};

declare global {
	namespace Express {
		interface Request {
			user: UserPayload;
		}
	}
}
