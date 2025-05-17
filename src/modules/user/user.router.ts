import { Router } from "express";
import {
	getAll,
	getById,
	getByEmail,
	getByName,
	changeProfilePic,
	updateUser,
} from "./user.controller";
import { validateIdParam } from "../../utils/globalValidation";
import {
	getByEmailSchema,
	getByNameSchema,
	updateUserSchema,
} from "./user.validation";
import { validate } from "../../middleware/validation";
import { upload } from "../../config/multer";
import { verifyJWT } from "../../middleware/verifyJWT";

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
 * /api/v1/users/name:
 *   get:
 *     summary: Get users by name
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
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
router.get("/name", verifyJWT, validate(getByNameSchema, "query"), getByName);

/**
 * @swagger
 * api/v1/users/me:
 *   patch:
 *     summary: Update the current user
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Username updated successfully
 *       401:
 *         description: Unauthorized
 */
router.patch("/me", verifyJWT, validate(updateUserSchema, "body"), updateUser);

/**
 * @swagger
 * /api/v1/users/profile-picture:
 *   patch:
 *     summary: Change the user's profile picture
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
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
router.patch(
	"/profile-picture",
	verifyJWT,
	upload.single("image"),
	changeProfilePic,
);

/**
 * @swagger
 * /api/v1/users/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
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
router.get("/:id", verifyJWT, validate(validateIdParam, "params"), getById);

/**
 * @swagger
 * /api/v1/users/{email}/getByEmail:
 *   get:
 *     summary: Get user by email
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
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
	verifyJWT,
	validate(getByEmailSchema, "params"),
	getByEmail,
);

export default router;
