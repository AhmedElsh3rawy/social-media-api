import { Router } from "express";
import { login, register } from "../controller/auth.js";
import {
  loginValidator,
  registerValidator,
} from "../utils/validation/auth.validator.js";
import { upload } from "../middleware/multer.js";

const router = Router();

router.post("/register", upload.single("image"), registerValidator, register);

router.post("/login", login);

export default router;
