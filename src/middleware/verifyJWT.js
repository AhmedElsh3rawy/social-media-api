import { db } from "../database/db.js";
import { users } from "../database/schema.js";
import { sql } from "drizzle-orm";
import jwt from "jsonwebtoken";
import APIError from "../utils/APIError.js";
import { asyncWrapper } from "../utils/asyncWrapper.js";
import { verifyAccessToken } from "../utils/jwt.js";

export const verifyJWT = asyncWrapper(async (req, res, next) => {
  const authHeader =
    req.headers["authorization"] || req.headers["Authorization"];
  if (!authHeader) return next(new APIError("Unauthorized access", 401));
  console.log(authHeader);
  const token = authHeader.split(" ")[1];
  if (!token) return next(new APIError("Token not found", 400));
  const decoded = await verifyAccessToken(token);
  const user = await db.query.users.findFirst({
    where: sql`${users.id} = ${decoded.id}`,
  });
  req.user = user;
  next();
});
