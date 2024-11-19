import { db } from "../database/db.js";
import { eq } from "drizzle-orm";
import { users } from "../database/schema.js";
import { asyncWrapper } from "../utils/asyncWrapper.js";
import APIError from "../utils/APIError.js";

export const getUsers = asyncWrapper(async (req, res, next) => {
  const result = await db
    .select({
      username: users.username,
      bio: users.bio,
      profileImage: users.profileImage,
    })
    .from(users);

  res.status(200).json(result);
});

export const getUserById = asyncWrapper(async (req, res, next) => {
  const userId = +req.params.id;
  const user = await db
    .select({
      username: users.username,
      bio: users.bio,
      profileImage: users.profileImage,
    })
    .from(users)
    .where(eq(users.id, userId));

  if (!user)
    return next(new APIError("User does not exist or invalid id"), 400);
  res.status(200).json(user);
});

export const updateUser = asyncWrapper(async (req, res, next) => {
  const userId = +req.params.id;
  const { username, bio, profileImage } = req.body;
  if (username) {
    await db.update(users).set({ username }).where(eq(users.id, userId));
  }
  if (bio) {
    await db.update(users).set({ bio }).where(eq(users.id, userId));
  }
  if (profileImage) {
    await db.update(users).set({ profileImage }).where(eq(users.id, userId));
  }
  res
    .status(200)
    .json({ statusCode: 200, status: "Ok", message: "User has been update" });
});
