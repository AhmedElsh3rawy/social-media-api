import { Router } from "express";
import { login, logout, register } from "../controller/auth.js";
import { refresh } from "../controller/refresh.js";
import {
  loginValidator,
  registerValidator,
} from "../utils/validation/auth.validator.js";
import { upload } from "../middleware/multer.js";
import { verifyJWT } from "../middleware/verifyJWT.js";

const router = Router();

router.post("/register", upload.single("image"), registerValidator, register);

router.post("/login", loginValidator, login);

router.get("/logout", verifyJWT, logout);

router.get("/refresh", refresh);

export default router;
