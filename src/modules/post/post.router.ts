import { Router } from "express";
import { createPost, deletePost } from "./post.controller";
import { validate } from "../../middleware/validation";
import { createPostSchema, deletePostSchema } from "./post.validation";
import { validateIdParam } from "../../utils/globalValidation";

const router = Router();

router.post("/", validate(createPostSchema, "body"), createPost);

router.delete("/:id", validate(validateIdParam, "params"), deletePost);

export default router;
