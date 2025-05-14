import { Router } from "express";
import { createPost } from "./post.controller";
import { validate } from "../../middleware/validation";
import { createPostSchema } from "./post.validation";

const router = Router();

router.post("/", validate(createPostSchema, "body"), createPost);

export default router;
