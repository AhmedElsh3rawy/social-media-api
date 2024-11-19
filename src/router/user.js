import { Router } from "express";
import {
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../controller/user.js";
import { upload } from "../middleware/multer.js";

const router = Router();

router.get("/", getUsers);

router.get("/:id", getUser);

router.patch("/:id", upload.single("image"), updateUser);

router.delete("/:id", deleteUser);

export default router;
