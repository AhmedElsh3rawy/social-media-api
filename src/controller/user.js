import { db } from "../database/db.js";
import { users } from "../database/schema.js";
import { asyncWrapper } from "../utils/asyncWrapper.js";

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
