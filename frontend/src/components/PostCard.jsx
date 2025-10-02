import React, { useState } from "react";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import CommentModal from "./commentModal";


const getFullURL = (path) => {
  if (!path) return "http://localhost:5001/uploads/default.jpg";
  if (path.startsWith("http")) return path;
  return `http://localhost:5001/${path}`;
};



const PostCard = ({ post, onLike }) => {
  const [showComments, setShowComments] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow-md p-5 hover:shadow-xl transition-shadow duration-300">
      {/* User Info */}
      <div className="flex items-center space-x-3 mb-4">
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
          <h2 className="font-semibold text-gray-800">{post?.userId?.name}</h2>
          <p className="text-sm text-gray-500">
            {formatDistanceToNow(new Date(post?.createdAt), {
              addSuffix: true,
            })}
          </p>
        </div>
      </div>

      {/* Post Body */}
      <p className="text-gray-700 mb-4">{post?.body}</p>

      {/* Post Media */}
      {post?.media?.path && post?.fileType?.startsWith("image") && (
        <div className="w-full rounded-lg overflow-hidden mb-4">
          <Image
            src={getFullURL(post.media.path)}
            alt={post.media.filename}
            width={600}
            height={400}
            className="object-cover w-full max-h-[400px] rounded-lg"
          />
        </div>
      )}

{/* Likes + Actions */}
<div className="flex justify-around items-center text-gray-600 text-sm border-t pt-3">
  {/* Like Section */}
  <button onClick={onLike} className="flex items-center space-x-1 hover:text-blue-600 transition cursor-pointer">
    <span>👍</span>
    <span>({post?.likes || 0})</span>
    <span>Like</span>
  </button>

          {/* Comment Button */}
          <button
            onClick={() => setShowComments(true)}
            className="flex items-center space-x-1 hover:text-teal-600 transition cursor-pointer"
          >
            <span>💬</span>
            <span>Comment</span>
          </button>

  {/* Share Section */}
  <button className="flex items-center space-x-1 hover:text-purple-600 transition cursor-pointer ">
    <span>🔗</span>
    <span>Share</span>
  </button>
</div>
 {/* Comment Modal */}
      {showComments && <CommentModal post={post} onClose={() => setShowComments(false)} />}

    </div>
  );
};

export default PostCard;
