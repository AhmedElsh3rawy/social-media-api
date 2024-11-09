import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import APIError from "../utils/APIError.js";

const storage = multer.diskStorage({
  // FIXME: multer destination not creating directories
  destination: (req, _, cb) => {
    const { baseUrl } = req;
    const isPost = baseUrl === "/api/posts";

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    cb(
      null,
      path.join(__dirname, `../../uploads/${isPost ? "post" : "profile"}`),
    );
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
