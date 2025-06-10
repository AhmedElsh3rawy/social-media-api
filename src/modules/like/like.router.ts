import { Router } from "express";
import { getAllPostLikes, togglePostLike } from "./like.controller";
import { validateIdParam } from "../../utils/globalValidation";
import { validate } from "../../middleware/validation";

const router = Router();

router.post("/react/:id", validate(validateIdParam, "params"), togglePostLike);

router.get("/:id", validate(validateIdParam, "params"), getAllPostLikes);

export default router;
