import { Router } from "express";
import { login, logout, refresh, register } from "./auth.controller";
import { upload } from "../../config/multer";
import { validate } from "../../middleware/validation";
import { loginSchema, registerSchema } from "./auth.validation";
import { verifyJWT } from "../../middleware/verifyJWT";

const router = Router();

router.post(
	"/register",
	upload.single("image"),
	validate(registerSchema, "body"),
	register,
);

router.post("/login", validate(loginSchema, "body"), login);

router.post("/refresh", refresh);

router.delete("/logout", verifyJWT, logout);

export default router;
