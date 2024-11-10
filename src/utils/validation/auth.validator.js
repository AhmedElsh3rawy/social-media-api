import { check } from "express-validator";
import { sql } from "drizzle-orm";
import { db } from "../../database/db.js";
import { users } from "../../database/schema.js";
import { validator } from "../../middleware/validator.js";

export const registerValidator = [
  check("username")
    .isLength({ min: 2 })
    .withMessage("Username should be 2 characters at least")
    .isLength({ max: 40 })
    .withMessage("Username should be 40 characters at most"),
  check("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please enter a valid email")
    .custom(async (email) => {
      const user = await db.query.users.findFirst({
        where: sql`${users.email} = ${email}`,
      });
      if (user) throw new Error("This email is used by another user");
    }),
  check("password")
    .isLength({ min: 8 })
    .withMessage("Password should be 8 characters at least")
    .isLength({ max: 20 })
    .withMessage("Password should be 20 characters at most"),
  validator,
];
