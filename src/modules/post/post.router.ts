import { Router } from "express";
import { createPost, deletePost, updatePost } from "./post.controller";
import { validate } from "../../middleware/validation";
import { createPostSchema } from "./post.validation";
import { validateIdParam } from "../../utils/globalValidation";

const router = Router();

router.post("/", validate(createPostSchema, "body"), createPost);

router.patch("/:id", validate(validateIdParam, "params"), updatePost);

router.delete("/:id", validate(validateIdParam, "params"), deletePost);

export default router;
