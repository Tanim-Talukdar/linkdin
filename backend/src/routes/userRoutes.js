import {Router} from "express";
import { getAllUser, getUserAndProfile, login, register, UpdateProfileData, updateUserProfile, uploadProfilePicture } from "../controllers/userController.js";
import wrapAsync from "../utils/wrapAsync.js";
import multer from "multer";
import fs from "fs";
import path from "path";
// import { storage } from "../cloudinary.js";

// Ensure uploads folder exists
const uploadPath = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath);

// Multer disk storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadPath),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + Date.now() + ext);
  },
});

const upload = multer({ storage });

const router = Router();


router.post("/upload_Profile_picture",upload.single("Profile_picture"), uploadProfilePicture)
router.post("/register" , wrapAsync(register));
router.post("/login" , wrapAsync(login));
router.post("/user_Profile_update", wrapAsync(updateUserProfile));
router.get("/get_user_profile", wrapAsync(getUserAndProfile));
router.post("/update_profile_data", wrapAsync(UpdateProfileData));
router.get("/get_All_User", wrapAsync(getAllUser));


export default router ;