import { db } from "../database/db.js";
import { eq } from "drizzle-orm";
import { users } from "../database/schema.js";
import { asyncWrapper } from "../utils/asyncWrapper.js";
import APIError from "../utils/APIError.js";

export const getUsers = asyncWrapper(async (req, res, next) => {
  const result = await db
    .select({
      id: users.id,
      username: users.username,
      bio: users.bio,
      profileImage: users.profileImage,
    })
    .from(users);

  res.status(200).json(result);
});

export const getUser = asyncWrapper(async (req, res, next) => {
  const userId = +req.params.id;
  if (isNaN(userId) || userId <= 0) {
    return next(
      new APIError("User id should be numerical and greater than 0"),
      400,
    );
  }
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
  if (isNaN(userId) || userId <= 0) {
    return next(
      new APIError("User id should be numerical and greater than 0"),
      400,
    );
  }
  const { username, bio, profileImage } = req.body;
  let updatedFields = {};
  if (username) updatedFields.username = username;
  if (bio) updatedFields.bio = bio;
  if (profileImage) updatedFields.profileImage = profileImage;

  await db.update(users).set(updatedFields).where(eq(users.id, userId));
  res
    .status(200)
    .json({ statusCode: 200, status: "Ok", message: "User has been update" });
});

export const deleteUser = asyncWrapper(async (req, res, next) => {
  const userId = +req.params.id;
  if (isNaN(userId) || userId <= 0) {
    return next(
      new APIError("User id should be numerical and greater than 0"),
      400,
    );
  }

  await db.delete(users).where(eq(users.id, userId));
  res
    .status(200)
    .json({ statusCode: 200, status: "Ok", message: "User has been deleted" });
});
