import { Router } from "express";
import { getAllLikes, toggleLike } from "./like.controller";
import { validateIdParam } from "../../utils/globalValidation";
import { validate } from "../../middleware/validation";

const router = Router();

router.post("/react/:id", validate(validateIdParam, "params"), toggleLike);

router.get("/:id", validate(validateIdParam, "params"), getAllLikes);

export default router;
