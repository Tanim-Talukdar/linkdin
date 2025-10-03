import { Router } from "express";
import { uploadProfilePicture, updateUserProfile, getUserAndProfile, UpdateProfileData, getAllUser } from "../controllers/userController.js";
import wrapAsync from "../utils/wrapAsync.js";
import multer from "multer";
import fs from "fs";
import path from "path";

const uploadPath = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath);

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadPath),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + Date.now() + ext);
  },
});

const upload = multer({ storage });

const router = Router();

router.post("/upload", upload.single("Profile_picture"), uploadProfilePicture);
router.post("/update", wrapAsync(updateUserProfile));
router.get("/get", wrapAsync(getUserAndProfile));
router.post("/update_data", wrapAsync(UpdateProfileData));
router.get("/allUser", wrapAsync(getAllUser))

export default router;
