import { Router } from "express";
import { validate } from "../../middleware/validation";
import { validateIdParam } from "../../utils/globalValidation";
import {
	follow,
	getAllFollowers,
	getAllFollowing,
	unfollow,
} from "./follow.controller";

const router = Router();

/**
 * @swagger
 * /api/v1/getAllFollowers:
 *   get:
 *     summary: Get all user followers
 *     tags: [Follow]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: A list of users
 */
router.get("/getAllFollowers", getAllFollowers);

/**
 * @swagger
 * /api/v1/getAllFollowings:
 *   get:
 *     summary: Get all user followings
 *     tags: [Follow]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: A list of users
 */
router.get("/getAllFollowings", getAllFollowing);

router.post("/:id/follow", validate(validateIdParam, "params"), follow);

router.delete("/:id/unfollow", validate(validateIdParam, "params"), unfollow);

export default router;
