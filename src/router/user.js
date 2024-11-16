import { Router } from "express";
import { getUserById, getUsers } from "../controller/user.js";

const router = Router();

router.get("/", getUsers);

router.get("/:id", getUserById);

export default router;
