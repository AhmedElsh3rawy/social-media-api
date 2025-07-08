import { Router } from "express";
import { validate } from "../../middleware/validation";
import { validateIdParam } from "../../utils/globalValidation";
import { toggleFollow } from "./follow.controller";

const router = Router();

router.post("/:id", validate(validateIdParam, "params"), toggleFollow);

export default router;
