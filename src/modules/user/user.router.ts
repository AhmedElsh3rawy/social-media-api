import { Router } from "express";
import { getAll, getById, getByEmail } from "./user.controller";
import { getByIdSchema, getByEmailSchema } from "./user.validation";
import { validate } from "../../middleware/validation";

const router = Router();

/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: A list of users
 */
router.get("/", getAll);

/**
 * @swagger
 * /api/v1/users/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User found
 *       404:
 *         description: User not found
 */
router.get("/:id", validate(getByIdSchema, "params"), getById);

router.get(
	"/:email/getByEmail",
	validate(getByEmailSchema, "params"),
	getByEmail,
);

export default router;
