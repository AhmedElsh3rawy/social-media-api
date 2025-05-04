import { Router } from "express";
import { register } from "./auth.controller";
import { upload } from "../../config/multer";
import { validate } from "../../middleware/validation";
import { registerSchema } from "./auth.validation";

const router = Router();

router.post(
	"/register",
	upload.single("image"),
	validate(registerSchema, "body"),
	register,
);

export default router;
