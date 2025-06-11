import { Router } from "express";
import { getAllUser, downloadUserInfo } from "../controllers/userController.js";
import wrapAsync from "../utils/wrapAsync.js";

const router = Router();

router.get("/all", wrapAsync(getAllUser));
router.get("/download_resume", wrapAsync(downloadUserInfo));

export default router;
