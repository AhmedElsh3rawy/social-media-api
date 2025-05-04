import { Router } from "express";
import { register } from "./auth.controller";
import { upload } from "../../config/multer";
import { validate } from "../../middleware/validation";
import { registerSchema } from "./auth.validation";

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

export default router;
