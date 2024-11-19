import { db } from "../database/db.js";
import { and, eq } from "drizzle-orm";
import { users, followers } from "../database/schema.js";
import { asyncWrapper } from "../utils/asyncWrapper.js";
import APIError from "../utils/APIError.js";

export const follow = asyncWrapper(async (req, res, next) => {
  const userId = +req.params.id;
  if (isNaN(userId) || userId <= 0) {
    return next(
      new APIError("User id should be numerical and greater than 0"),
      400,
    );
  }
  const followerId = +req.user.id;

  await db.insert(followers).values({
    followerId: followerId,
    followedId: userId,
  });

  res.status(200).json({ statusCode: 200, status: "Ok" });
});

export const unfollow = asyncWrapper(async (req, res, next) => {
  const userId = +req.params.id;
  if (isNaN(userId) || userId <= 0) {
    return next(
      new APIError("User id should be numerical and greater than 0"),
      400,
    );
  }
  const followerId = +req.user.id;

  await db
    .delete(followers)
    .where(
      and(
        eq(followers.followerId, followerId),
        eq(followers.followedId, userId),
      ),
    );

  res.status(200).json({ statusCode: 200, status: "Ok" });
});

export const getFollowers = asyncWrapper(async (req, res, next) => {});

export const getFollowings = asyncWrapper(async (req, res, next) => {});
