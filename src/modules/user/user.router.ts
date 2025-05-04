import { Router } from "express";
import { getAll, getById } from "./user.controller";
import { getByIdSchema } from "./user.validation";
import { validate } from "../../middleware/validation";

const router = Router();

router.get("/", getAll);

router.get("/:id", validate(getByIdSchema, "params"), getById);

export default router;
