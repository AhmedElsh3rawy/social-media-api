import { Router } from "express";
import {
	getAll,
	getById,
	getByEmail,
	getByName,
	changeProfilePic,
	updateName,
} from "./user.controller";
import { validateIdParam } from "../../utils/globalValidation";
import {
	getByEmailSchema,
	getByNameSchema,
	updateUserSchema,
} from "./user.validation";
import { validate } from "../../middleware/validation";
import { upload } from "../../config/multer";
import { verifyJWT } from "../../middleware/verifyJWT";

const router = Router();

router.get("/", getAll);

router.get("/name", verifyJWT, validate(getByNameSchema, "query"), getByName);

router.patch("/me", verifyJWT, validate(updateUserSchema, "body"), updateName);

router.patch(
	"/profile-picture",
	verifyJWT,
	upload.single("image"),
	changeProfilePic,
);

router.get("/:id", verifyJWT, validate(validateIdParam, "params"), getById);

router.get(
	"/:email/getByEmail",
	verifyJWT,
	validate(getByEmailSchema, "params"),
	getByEmail,
);

export default router;
