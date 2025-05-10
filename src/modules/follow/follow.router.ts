import { Router } from "express";
import { validate } from "../../middleware/validation";
import { followSchema } from "./follow.validation";
import { follow, unfollow } from "./follow.controller";

const router = Router();

router.post("/:id/follow", validate(followSchema, "params"), follow);

router.delete("/:id/unfollow", validate(followSchema, "params"), unfollow);

export default router;
