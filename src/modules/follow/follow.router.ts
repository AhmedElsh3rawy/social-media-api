import { Router } from "express";
import { validate } from "../../middleware/validation";
import { followSchema } from "./follow.validation";
import { follow, getAllFollowers, unfollow } from "./follow.controller";

const router = Router();

router.get("/getAllFollowers", getAllFollowers);

router.post("/:id/follow", validate(followSchema, "params"), follow);

router.delete("/:id/unfollow", validate(followSchema, "params"), unfollow);

export default router;
