import React, { useState } from "react";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import CommentModal from "./commentModal";
import { useSelector, useDispatch } from "react-redux";
import { deletePost, getAllPosts } from "@/config/redux/action/postAction";
import { toast } from "react-hot-toast";

const getFullURL = (path) => {
  if (!path) return "http://localhost:5001/uploads/default.jpg";
  if (path.startsWith("http")) return path;
  return `http://localhost:5001/${path}`;
};

const PostCard = ({ post, onLike }) => {
  const [showComments, setShowComments] = useState(false);
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);

  const isOwner = authState.user?.userId?._id === post?.userId?._id;

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this post?")) return;

    try {
      await dispatch(deletePost({ post_id: post._id, CryptoToken: localStorage.getItem("token") })).unwrap();
      toast.success("Post deleted successfully!");
      dispatch(getAllPosts());
    } catch (err) {
      console.error(err);
      toast.error(err || "Failed to delete post.");
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 w-full max-w-2xl mx-auto mb-6 border border-gray-100 overflow-hidden">
      
      {/* User Info */}
      <div className="flex items-center justify-between px-5 py-3 bg-gray-50">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-teal-500">
            <Image
              src={getFullURL(post?.userId?.profilePicture?.path)}
              alt={post?.userId?.name || "User"}
              width={48}
              height={48}
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="font-semibold text-gray-800 text-sm sm:text-base">{post?.userId?.name}</h2>
            <p className="text-xs sm:text-sm text-gray-500">
              {formatDistanceToNow(new Date(post?.createdAt), { addSuffix: true })}
            </p>
          </div>
        </div>

{/* Delete Button */}
{isOwner && (
  <button
    onClick={handleDelete}
    className="flex items-center space-x-1 bg-red-500 hover:bg-red-600 text-white text-xs sm:text-sm px-3 py-1.5 rounded-full shadow-sm hover:shadow-md transition-all duration-200"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4 sm:h-5 sm:w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4a1 1 0 011 1v1H9V4a1 1 0 011-1z" />
    </svg>
    <span>Delete</span>
  </button>
)}
      </div>

      {/* Post Body */}
      <div className="px-5 py-4">
        <p className="text-gray-700 text-sm sm:text-base mb-4 break-words">{post?.body}</p>

        {/* Post Media */}
        {post?.media?.path && post?.fileType?.startsWith("image") && (
          <div className="w-full rounded-xl overflow-hidden mb-4 flex justify-center hover:scale-105 transition-transform duration-300">
            <Image
              src={getFullURL(post.media.path)}
              alt={post.media.filename}
              width={600}
              height={400}
              className="object-contain w-full h-auto rounded-xl"
            />
          </div>
        )}

        {/* Likes + Actions */}
        <div className="flex justify-around items-center text-gray-600 text-xs sm:text-sm border-t pt-3">
          {/* Like Section */}
          <button
            onClick={onLike}
            className="flex items-center space-x-1 hover:text-blue-600 transition cursor-pointer py-2 px-4 rounded-lg hover:bg-blue-50"
          >
            <span>👍</span>
            <span>({post?.likes || 0})</span>
            <span>Like</span>
          </button>

          {/* Comment Button */}
          <button
            onClick={() => setShowComments(true)}
            className="flex items-center space-x-1 hover:text-teal-600 transition cursor-pointer py-2 px-4 rounded-lg hover:bg-teal-50"
          >
            <span>💬</span>
            <span>Comment</span>
          </button>

          {/* Share Section */}
          <button className="flex items-center space-x-1 hover:text-purple-600 transition cursor-pointer py-2 px-4 rounded-lg hover:bg-purple-50">
            <span>🔗</span>
            <span>Share</span>
          </button>
        </div>
      </div>

      {/* Comment Modal */}
      {showComments && (
        <CommentModal post={post} onClose={() => setShowComments(false)} />
      )}
    </div>
  );
};

export default PostCard;
