import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import APIError from "../utils/APIError.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day}_${hours}:${minutes}:${seconds}`;
};

const storage = multer.diskStorage({
  destination: (req, _, cb) => {
    const basePath = path.join(__dirname, "../../uploads");
    fs.mkdirSync(basePath, { recursive: true });

    const isPost = req.path === "/api/posts";
    const fullPath = path.join(basePath, isPost ? "post" : "profile");
    fs.mkdirSync(fullPath, { recursive: true });

    cb(null, fullPath);
  },
  filename: (_, file, cb) => {
    cb(null, formatDate(new Date()) + "_" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) cb(null, true);
  else cb(new APIError("Unsupported file format", 400), false);
};

export const upload = multer({ storage, fileFilter });
