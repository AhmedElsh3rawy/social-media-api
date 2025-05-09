import { Router } from "express";
import {
	getAll,
	getById,
	getByEmail,
	getByName,
	changeProfilePic,
} from "./user.controller";
import {
	getByIdSchema,
	getByEmailSchema,
	getByNameSchema,
} from "./user.validation";
import { validate } from "../../middleware/validation";
import { upload } from "../../config/multer";

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
 * /api/v1/users/profile-picture:
 *   patch:
 *     summary: Change the user's profile picture
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Profile picture updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     imageUrl:
 *                       type: string
 */
router.patch("/profile-picture", upload.single("image"), changeProfilePic);

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

/**
 * @swagger
 * /api/v1/users/{email}/getByEmail:
 *   get:
 *     summary: Get user by email
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         description: The email of the user
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User found
 *       404:
 *         description: User not found
 */
router.get(
	"/:email/getByEmail",
	validate(getByEmailSchema, "params"),
	getByEmail,
);

/**
 * @swagger
 * /api/v1/users/name/getByName:
 *   get:
 *     summary: Get users by name
 *     tags: [Users]
 *     parameters:
 *       - in: query
 *         name: name
 *         required: true
 *         description: The name of the user
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Users found
 *       400:
 *         description: No user by that name
 */
router.get("/name/getByName", validate(getByNameSchema, "query"), getByName);

export default router;
