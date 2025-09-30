// components/PostCard.jsx
import React from "react";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";



const PostCard = ({ post }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow mb-4">
      {/* User Info */}
      <div className="flex items-center space-x-3 mb-3">
        <div className="w-10 h-10 rounded-full overflow-hidden">
          <Image
            src={`http://localhost:5001/${post?.userId?.profilePicture?.path || "uploads/default.jpg"}`}
            alt={post?.userId?.name || "User"}
            width={40}
            height={40}
            className="object-cover"
          />
        </div>
        <div>
          <h2 className="font-semibold">{post?.userId?.name}</h2>
          <p className="text-sm text-gray-500">
            {formatDistanceToNow(new Date(post?.createdAt), {
              addSuffix: true,
            })}
          </p>
        </div>
      </div>

      {/* Post Body */}
      <p className="text-gray-700 mb-3">{post?.body}</p>

      {/* Post Media */}
      {post?.media?.path && post?.fileType?.startsWith("image") && (
        <div className="rounded-lg overflow-hidden mb-3">
          <Image
            src={`http://localhost:5001/${post.media.path}`}
            alt={post.media.filename}
            width={600}
            height={400}
            className="object-cover w-full"
          />
        </div>
      )}

      {/* Likes + Actions */}
      <div className="flex items-center justify-between text-gray-600 text-sm">
        <p>{post?.likes || 0} Likes</p>
        <div className="flex space-x-4">
          <button className="hover:text-blue-600">👍 Like</button>
          <button className="hover:text-teal-600">💬 Comment</button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
