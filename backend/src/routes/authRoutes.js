import { Router } from "express";
import { register, login } from "../controllers/userController.js";
import wrapAsync from "../utils/wrapAsync.js";

const router = Router();

router.post("/register", wrapAsync(register));
router.post("/login", wrapAsync(login));

export default router;
