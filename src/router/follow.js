import { Router } from "express";
import { follow, unfollow } from "../controller/follow.js";

const router = Router();

router.get("/follow/:id", follow);

router.get("/unfollow/:id", unfollow);

export default router;
