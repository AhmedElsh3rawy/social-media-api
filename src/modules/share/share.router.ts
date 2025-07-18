import { Router } from "express";
import { createShare, updateShare, deleteShare } from "./share.controller";
import { validateIdParam } from "../../utils/globalValidation";
import { validate } from "../../middleware/validation";
import { createShareSchema } from "./share.validation";

const router = Router();

router.post("/", validate(createShareSchema, "body"), createShare);

router.patch("/:id", validate(validateIdParam, "params"), updateShare);

router.delete("/:id", validate(validateIdParam, "params"), deleteShare);

export default router;
