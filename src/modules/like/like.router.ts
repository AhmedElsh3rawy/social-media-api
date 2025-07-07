import { Router } from "express";
import { toggleLike, getAllLikes } from "./like.controller";
import { validateIdParam } from "../../utils/globalValidation";
import { validate } from "../../middleware/validation";

const router = Router();

router.post("/:type/:id", validate(validateIdParam, "params"), toggleLike);

router.get("/:id", validate(validateIdParam, "params"), getAllLikes);

export default router;
