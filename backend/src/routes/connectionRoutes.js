import { Router } from "express";
import { sendConnectionRequest, myConnections, getSentConnetion, acceptConnections } from "../controllers/userController.js";
import wrapAsync from "../utils/wrapAsync.js";

const router = Router();

router.post("/send", wrapAsync(sendConnectionRequest));
router.get("/my/:CryptoToken", wrapAsync(myConnections));
router.get("/sent/:CryptoToken", wrapAsync(getSentConnetion));
router.post("/accept", wrapAsync(acceptConnections));

export default router;
