import { Router } from "express";
import { getUserById, getUsers, updateUser } from "../controller/user.js";

const router = Router();

router.get("/", getUsers);

router.get("/:id", getUserById);

router.patch("/:id", updateUser);

export default router;
