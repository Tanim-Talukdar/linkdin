import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts, createPost, likeIncreaments } from "@/config/redux/action/postAction";
import { getUserAndProfile } from "@/config/redux/action/authAction";
import { useRouter } from "next/router";
import DashboardLayout from "@/layout/DashboardLayout";
import PostCard from "@/components/PostCard";
import { toast, Toaster } from "react-hot-toast";

export default function Dashboard() {
  const router = useRouter();
  const dispatch = useDispatch();

  const postState = useSelector((state) => state.post);
  const authState = useSelector((state) => state.auth);

  const [postBody, setPostBody] = useState("");
  const [postFile, setPostFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  // Token check
  useEffect(() => {
    if (!localStorage.getItem("token")) router.push("/login");
  }, [router]);

  // Fetch posts & user
  useEffect(() => {
    dispatch(getAllPosts());
    dispatch(getUserAndProfile({ token: localStorage.getItem("token") }));
  }, [dispatch]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPostFile(file);
    setPreview(file ? URL.createObjectURL(file) : null);
  };

  useEffect(() => {
    return () => preview && URL.revokeObjectURL(preview);
  }, [preview]);

  const handleCreatePost = async () => {
    if (!postBody && !postFile) {
      toast.error("Write something or add a file!");
      return;
    }

    setLoading(true);
    try {
      await dispatch(
        createPost({ CryptoToken: localStorage.getItem("token"), body: postBody, file: postFile })
      ).unwrap();

      setPostBody("");
      setPostFile(null);
      setPreview(null);
      dispatch(getAllPosts());
      toast.success("Post created successfully!");
    } catch (err) {
      console.error(err);
      toast.error(err || "Failed to create post.");
    } finally {
      setLoading(false);
    }
  };

  const onLike = (id) => dispatch(likeIncreaments(id));

  if (!authState?.myProfile || !authState?.myProfile?.userId) {
    return (
      <DashboardLayout authState={authState}>
        <div className="flex items-center justify-center h-screen">
          <p className="text-gray-500 text-lg font-medium">Loading...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout authState={authState}>
      <Toaster position="top-right" reverseOrder={false} />

      {/* Create Post */}
      <div className="bg-white p-4 rounded-lg shadow space-y-3 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 space-y-3 sm:space-y-0">
          <input
            type="text"
            placeholder="Start a post..."
            className="flex-1 border rounded-full px-4 py-2 focus:outline-none w-full"
            value={postBody}
            onChange={(e) => setPostBody(e.target.value)}
          />

          <input
            type="file"
            onChange={handleFileChange}
            className="hidden"
            id="fileInput"
            accept="image/*"
          />
          <label
            htmlFor="fileInput"
            className="bg-teal-500 text-white px-4 py-2 rounded-full cursor-pointer text-center"
          >
            Add Photo
          </label>
        </div>

        {/* Preview Image */}
        {preview && (
          <div className="relative mt-2 w-full sm:w-40 h-40 rounded overflow-hidden border border-gray-300">
            <button
              onClick={() => {
                setPreview(null);
                setPostFile(null);
              }}
              className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold z-10"
            >
              ×
            </button>
            <img src={preview} alt="Preview" className="w-full h-full object-contain" />
          </div>
        )}

        {/* Add Post Button */}
        <div>
          <button
            className={`w-full bg-teal-500 text-white px-4 py-2 rounded-lg ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handleCreatePost}
            disabled={loading}
          >
            {loading ? "Posting..." : "Add Post"}
          </button>
        </div>
      </div>

      {/* Posts */}
      <div className="space-y-6">
        {postState.posts?.length > 0 ? (
          postState.posts.map((post) => (
            <PostCard key={post._id} post={post} onLike={() => onLike(post._id)} />
          ))
        ) : (
          <p className="text-gray-500 text-center">No posts yet.</p>
        )}
      </div>
    </DashboardLayout>
  );
}
