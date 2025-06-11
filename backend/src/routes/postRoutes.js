import { Router } from "express";
import wrapAsync from "../utils/wrapAsync.js";
import { activeCheak, commentPost, createPost, deleteComment, deletePost, get_Comment_Post, getAllPost, likeIncreaments } from "../controllers/postController.js";
import multer from "multer";
import fs from "fs";
import path from "path";


const router = Router();



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

router.get('/a', wrapAsync(activeCheak));
router.post("/post",upload.single('media'), wrapAsync(createPost));
router.get("/posts", wrapAsync(getAllPost));
router.post("/delete_post", wrapAsync(deletePost));
router.post("/comment", wrapAsync(commentPost))
router.get("/all_comment", wrapAsync(get_Comment_Post));
router.delete("/delete_comment", wrapAsync(deleteComment));
router.post("/increament_post_like", wrapAsync(likeIncreaments));


export default router;