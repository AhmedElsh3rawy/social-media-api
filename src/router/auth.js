import { Router } from "express";
import { register } from "../controller/auth.js";
import { registerValidator } from "../utils/validation/auth.validator.js";
import { upload } from "../middleware/multer.js";

const router = Router();

router.post("/register", upload.single("image"), registerValidator, register);

export default router;
