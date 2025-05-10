import { Router } from "express";
import { validate } from "../../middleware/validation";
import { followSchema } from "./follow.validation";
import { follow } from "./follow.controller";

const router = Router();

router.post("/:id/follow", validate(followSchema, "params"), follow);

export default router;
