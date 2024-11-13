import { db } from "../database/db.js";
import { sql, eq } from "drizzle-orm";
import { users, tokens } from "../database/schema.js";
import { asyncWrapper } from "../utils/asyncWrapper.js";
import APIError from "../utils/APIError.js";
import { hashPassword, comparePasswords } from "../utils/password.js";
import { creatAccessToken, creatRefreshToken } from "../utils/jwt.js";

export const register = asyncWrapper(async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashed = hashPassword(password);

  await db.insert(users).values({
    username: username,
    email: email,
    password: hashed,
    profileImage: req.file?.filename,
  });

  res.status(201).json({ statusCode: 201, status: "Created" });
});

export const login = asyncWrapper(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await db.query.users.findFirst({
    where: sql`${users.email} = ${email}`,
  });
  const matched = comparePasswords(password, user.password);
  if (!user || !matched)
    return next(new APIError("Invalid email or password", 400));

  const accessToken = await creatAccessToken(user.id);
  const refreshToken = await creatRefreshToken(user.id);
  await db.insert(tokens).values({ token: refreshToken });

  res.cookie("token", refreshToken, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  });
  res.status(200).json({ token: accessToken });
});

export const logout = asyncWrapper(async (req, res, next) => {
  const token = req.cookies?.token;
  if (!token) return next(new APIError("You are not logged in", 403));

  await db.delete(tokens).where(eq(tokens.token, token));
  res.clearCookie("token", { httpOnly: true });
  res.status(200).json({ message: "Logged out successfully" });
});
