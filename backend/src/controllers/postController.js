import Profile from "../models/profileModel.js";
import User from "../models/userModel.js";
import Post from "../models/postModel.js";
import Comment from "../models/commentsModel.js"
import bcrypt from "bcrypt";

export const activeCheak = async (req,res) => {
    return res.status(200).json({message: "why you're so insecure ? The post is working ."})
}

export const createPost = async (req, res) => {
    const { CryptoToken } = req.body;
    
    const user = await User.findOne({CryptoToken});
    if(!user) return res.status(404).json({message: "User Not Found"});
    
    const post = new Post({
        userId: user._id,
        body: req.body.body,
        media: req.file ? {
            filename: req.file.filename,
            path: req.file.path,
        } : undefined,
        fileType: req.file ? req.file.mimetype : ""
    });

    await post.save();
    return res.status(200).json({message: "Post Created Successfully", post});
}

export const getAllPost = async (req, res) => {
    const posts = await Post.find().populate("userId", "name username email profilePicture");
    return res.json({posts});
}

export const deletePost = async (req, res) => {
  const { CryptoToken, post_id } = req.body;
  const user = await User.findOne({ CryptoToken }).select("_id");
  if (!user) return res.status(404).json({ message: "User Not Found" });

  const post = await Post.findById(post_id);
  if (!post) return res.status(404).json({ message: "Post Not Found" });

  if (post.userId.toString() !== user._id.toString())
    return res.status(403).json({ message: "Unauthorized" });

  // Delete image from Cloudinary (if exists)
  if (post.media && post.media.filename) {
    await cloudinary.uploader.destroy(post.media.filename);
  }

  await Post.deleteOne({ _id: post_id });
  return res.status(200).json({ message: "Post deleted successfully" });
};

export const commentPost = async (req, res) => {
    const { CryptoToken, post_id, commentBody } = req.body;

    const user = await User.findOne({CryptoToken});
    if(!user) return res.status(404).json({message: "User Not Found"});

    const post = await Post.findById(post_id);
    if(!post) return res.status(404).json({message: "Post Not Found"});

    const comment = new Comment({
        userId: user._id,
        postId: post_id,
        body: commentBody
    })

    await comment.save();
    await comment.populate("userId", "name email profilePicture");
    return res.status(200).json({message: "Comment added", comment: comment});
}

export const get_Comment_Post = async (req, res) => {
    const { post_id } = req.query;


    const post = await Post.findById(post_id);
    if(!post) return res.status(404).json({message: "Post Not Found"});
    
    const comments = await Comment.find({ postId: post_id }).populate('userId', 'name email'); 

    return res.status(200).json({comments});
}

export const deleteComment = async (req, res) => {
    const { CryptoToken, post_id,comment_id } = req.body;

    const user = await User.findOne({CryptoToken}).select('_id');
    if(!user) return res.status(404).json({message: "User Not Found"});

    const post = await Post.findById(post_id);
    if(!post) return res.status(404).json({message: "Post Not Found"});

    const comment = await Comment.findById(comment_id);
    if(!comment) return res.status(404).json({message: "Comment Not Found"});

    if (
        comment.userId.toString() !== user._id.toString() &&
        post.userId.toString() !== user._id.toString()
    ) {
        return res.status(403).json({ message: "Unauthorized" });
    }

    await Comment.deleteOne({_id: comment_id});
    return res.status(200).json({message: "comment deleted"});
}


export const likeIncreaments = async (req, res) => {
    const { post_id } = req.body;


    const post = await Post.findById(post_id);
    if(!post) return res.status(404).json({message: "Post Not Found"});
    
    post.likes = post.likes + 1;
    await post.save();

    return res.status(200).json({message: "like incremented"});
}