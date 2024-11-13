import { db } from "../database/db.js";
import { sql } from "drizzle-orm";
import { users } from "../database/schema.js";
import { asyncWrapper } from "../utils/asyncWrapper.js";
import { creatAccessToken, verifyRefreshToken } from "../utils/jwt.js";
import APIError from "../utils/APIError.js";

export const refresh = asyncWrapper(async (req, res, next) => {
  const token = req.cookies?.token;
  if (!token) return next(new APIError("No token provided", 403));

  const decoded = await verifyRefreshToken(token);
  const user = await db.query.users.findFirst({
    where: sql`${users.id} = ${decoded.id}`,
  });
  if (!user) return next(new APIError("You are not allowed", 401));

  const accessToken = await creatAccessToken(user.id);
  res.status(200).json({ token: accessToken });
});
