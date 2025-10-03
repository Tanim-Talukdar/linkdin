import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { createComment, deleteComment, getAllComment } from "@/config/redux/action/postAction";
import { getUserAndProfile } from "@/config/redux/action/authAction";
import { IoSend, IoTrash } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

const getFullURL = (path) => {
  if (!path) return "http://localhost:5001/uploads/default.jpg";
  if (path.startsWith("http")) return path;
  return `http://localhost:5001/${path}`;
};

const CommentModal = ({ post, onClose }) => {
  const dispatch = useDispatch();
  const postState = useSelector((state) => state.post);
    const authState = useSelector((state) => state.auth);
  const [commentBody, setCommentBody] = useState("");
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    if (post?._id) {
      dispatch(getAllComment(post._id));
    }
    dispatch(getUserAndProfile({ token: localStorage.getItem("token") }));
  }, [dispatch, post?._id]);

  const handleSend = async () => {
    if (!commentBody.trim()) return toast.error("Comment cannot be empty!");

    setIsSending(true);
    const promise = dispatch(
      createComment({
        post_id: post._id,
        commentBody,
        CryptoToken: localStorage.getItem("token"),
      })
    );

    toast.promise(promise, {
      loading: "Adding comment...",
      success: "Comment added!",
      error: "Failed to add comment",
    });

    promise.finally(() => setIsSending(false));
    setCommentBody("");
  };
const handleDelete = (comment_id) => {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  if (!token) {
    console.error("No token found");
    return;
  }

  if (!post?._id) {
    console.error("Post ID not available");
    return;
  }

  dispatch(deleteComment({
    post_id: post._id,
    CryptoToken: token,
    comment_id
  }));
};

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex justify-center items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Blur Background */}
        <motion.div
          className="absolute inset-0 backdrop-blur-sm bg-black/30"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        ></motion.div>

        {/* Modal container */}
        <motion.div
          className="relative bg-white rounded-xl w-4/5 h-4/5 flex overflow-hidden shadow-2xl z-10"
          initial={{ scale: 0.8, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 50 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
          {/* Post Image */}
          <div className="flex-1 bg-black relative">
            {post?.media?.path && post?.fileType?.startsWith("image") && (
              <Image
                src={getFullURL(post.media.path)}
                alt={post?.media?.filename || "post image"}
                fill
                className="object-contain"
              />
            )}
          </div>

          {/* Comments Section */}
          <div className="w-96 bg-gray-100 flex flex-col">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="font-semibold text-gray-800">Comments</h2>
              <button
                onClick={onClose}
                className="text-gray-600 hover:text-gray-900 transition"
              >
                ✖
              </button>
            </div>

            {/* Comment List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {postState.isLoading ? (
                // Skeleton Loader
                Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex space-x-4 animate-pulse">
                    <div className="w-10 h-10 rounded-full bg-gray-300"></div>
                    <div className="flex-1">
                      <div className="w-24 h-3 bg-gray-300 rounded mb-2"></div>
                      <div className="w-40 h-3 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                ))
              ) : postState?.comments?.length > 0 ? (
                postState.comments.map((c) => (
                  <motion.div
                    key={c._id}
                    className="flex space-x-4 items-start mb-5"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="w-10 h-10 rounded-full overflow-hidden mt-1 border">
                      <Image
                        src={getFullURL(
                          c?.userId?.profilePicture?.path ||
                            "uploads/default.jpg"
                        )}
                        alt={c?.userId?.name || "user"}
                        width={40}
                        height={40}
                        className="object-cover"
                      />
                    </div>
                    <div className="bg-white p-3 rounded-lg shadow-sm">
                      <p className="font-semibold text-gray-800 text-sm">
                        {c?.userId?.name || "Unknown User"}
                      </p>
                      <p className="text-gray-700 text-sm">{c?.body}</p>
                    </div>
                    {authState?.user?.userId?._id === c?.userId?._id && (
                        <button
                          onClick={() => handleDelete(c._id)}
                          className="text-red-500"
                        >
                          <IoTrash size={20} />
                        </button>
                    )}
                  </motion.div>
                  
                ))
              ) : (
                <p className="text-gray-500 text-sm text-center mt-10">
                  No comments yet
                </p>
              )}
            </div>

            {/* Input Section */}
            <div className="p-4 border-t bg-white">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  name="commentBody"
                  value={commentBody}
                  onChange={(e) => setCommentBody(e.target.value)}
                  placeholder="Write a comment..."
                  className="flex-1 p-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-green-500"
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  disabled={isSending}
                />
                <button
                  type="button"
                  onClick={handleSend}
                  disabled={isSending}
                  className={`p-2 rounded-full text-white flex items-center justify-center transition ${
                    isSending
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-green-500 hover:bg-green-600"
                  }`}
                >
                  <IoSend size={20} />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CommentModal;
