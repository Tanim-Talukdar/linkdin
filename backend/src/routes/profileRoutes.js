import { Router } from "express";
import { uploadProfilePicture, updateUserProfile, getUserAndProfile, UpdateProfileData, getAllUser } from "../controllers/userController.js";
import wrapAsync from "../utils/wrapAsync.js";
import multer from "multer";
import { storage } from "../cloudinary.js";

const upload = multer({ storage });

const router = Router();

router.post("/upload", upload.single("Profile_picture"), uploadProfilePicture);
router.post("/update", wrapAsync(updateUserProfile));
router.get("/get", wrapAsync(getUserAndProfile));
router.post("/update_data", wrapAsync(UpdateProfileData));
router.get("/allUser", wrapAsync(getAllUser))

export default router;
