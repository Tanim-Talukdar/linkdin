import { Router } from "express";
import wrapAsync from "../utils/wrapAsync.js";
import { activeCheak, commentPost, createPost, deleteComment, deletePost, get_Comment_Post, getAllPost, likeIncreaments } from "../controllers/postController.js";
import multer from "multer";
import { storage } from "../cloudinary.js";


const router = Router();


const upload = multer({ storage });

router.get('/a', wrapAsync(activeCheak));
router.post("/post",upload.single('media'), wrapAsync(createPost));
router.get("/posts", wrapAsync(getAllPost));
router.delete("/delete_post", wrapAsync(deletePost));
router.post("/comment", wrapAsync(commentPost));
router.get("/all_comment", wrapAsync(get_Comment_Post));
router.delete("/delete_comment", wrapAsync(deleteComment));
router.post("/increament_post_like", wrapAsync(likeIncreaments));


export default router;