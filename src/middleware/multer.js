import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import APIError from "../utils/APIError.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: (req, _, cb) => {
    const basePath = path.join(__dirname, "../../uploads");
    fs.mkdirSync(basePath, { recursive: true });

    const isPost = req.path === "/api/posts";
    const uploadDir = isPost ? "post" : "profile";
    const fullPath = path.join(basePath, uploadDir);
    fs.mkdirSync(fullPath, { recursive: true });

    cb(null, fullPath);
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) cb(null, true);
  else cb(new APIError("Unsupported file format", 400), false);
};

export const upload = multer({ storage, fileFilter });
