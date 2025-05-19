import { Router } from "express";
import { validate } from "../../middleware/validation";
import { validateIdParam } from "../../utils/globalValidation";
import {
	follow,
	getAllFollowers,
	getAllFollowing,
	getMyFollowers,
	getMyFollowing,
	unfollow,
} from "./follow.controller";

const router = Router();

router.get("/following/me", getMyFollowing);

router.get("/followers/me", getMyFollowers);

router.get(
	"/followers/:id",
	validate(validateIdParam, "params"),
	getAllFollowers,
);

router.get(
	"/following/:id",
	validate(validateIdParam, "params"),
	getAllFollowing,
);

router.post("/follow/:id", validate(validateIdParam, "params"), follow);

router.delete("/unfollow/:id", validate(validateIdParam, "params"), unfollow);

export default router;
