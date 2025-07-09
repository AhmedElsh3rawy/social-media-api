import { Router } from "express";
import { createComment, deleteComment } from "./comment.controller";
import { validate } from "../../middleware/validation";
import { validateIdParam } from "../../utils/globalValidation";
import { createCommentSchema } from "./comment.validatoin";

const router = Router();

router.post("/", validate(createCommentSchema, "body"), createComment);

router.delete("/:id", validate(validateIdParam, "params"), deleteComment);

export default router;
