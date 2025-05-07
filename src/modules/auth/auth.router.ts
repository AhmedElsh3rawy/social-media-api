import { Router } from "express";
import { login, refresh, register } from "./auth.controller";
import { upload } from "../../config/multer";
import { validate } from "../../middleware/validation";
import { loginSchema, registerSchema } from "./auth.validation";

const router = Router();

/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: name
 *         type: string
 *         required: true
 *       - in: formData
 *         name: password
 *         type: string
 *         required: true
 *       - in: formData
 *         name: email
 *         type: string
 *         required: true
 *       - in: formData
 *         name: image
 *         type: file
 *         required: false
 *     responses:
 *       200:
 *         description: User registered successfully
 *       400:
 *         description: Validation error
 *       500:
 *         description: Internal server error
 */
router.post(
	"/register",
	upload.single("image"),
	validate(registerSchema, "body"),
	register,
);

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Login and get tokens
 *     description: Logs in a user and returns access and refresh tokens.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful login, returns tokens
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *       400:
 *         description: Invalid email or password
 */
router.post("/login", validate(loginSchema, "body"), login);

router.post("/refresh", refresh);

export default router;
