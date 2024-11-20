import { Router } from "express";
import {
  deleteUser,
  getUserByEmail,
  getUserById,
  getUsers,
  updateUser,
} from "../controller/user.js";
import { upload } from "../middleware/multer.js";

const router = Router();

router.get("/", getUsers);

router.get("/:id([1-9]+)", getUserById);

router.get("/:email", getUserByEmail);

router.patch("/:id", upload.single("image"), updateUser);

router.delete("/:id", deleteUser);

export default router;
