import { Router } from "express";
import { getUserById, getUsers } from "../controller/user.js";

const router = Router();

router.get("/users", getUsers);

router.get("/users/:id", getUserById);

export default router;
