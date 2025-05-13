import { Router } from "express";
import { validate } from "../../middleware/validation";
import { followSchema } from "./follow.validation";
import {
	follow,
	getAllFollowers,
	getAllFollowing,
	unfollow,
} from "./follow.controller";

const router = Router();

router.get("/getAllFollowers", getAllFollowers);

router.get("/getAllFollowings", getAllFollowing);

router.post("/:id/follow", validate(followSchema, "params"), follow);

router.delete("/:id/unfollow", validate(followSchema, "params"), unfollow);

export default router;
