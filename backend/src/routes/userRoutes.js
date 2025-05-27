import {Router} from "express";
import { register } from "../controllers/userController.js";
import wrapAsync from "../utils/wrapAsync.js";

const router = Router();

router.post("/register" , wrapAsync(register));

export default router ;