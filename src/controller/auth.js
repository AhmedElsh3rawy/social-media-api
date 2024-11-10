import { db } from "../database/db.js";
import { users } from "../database/schema.js";
import { asyncWrapper } from "../utils/asyncWrapper.js";
import { hashPassword, comparePasswords } from "../utils/password.js";

export const register = asyncWrapper(async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashed = hashPassword(password);

  await db.insert(users).values({
    username: username,
    email: email,
    password: hashed,
    profileImage: req.file.path,
  });

  res.status(201).json({ statusCode: 201, status: "Created" });
});
