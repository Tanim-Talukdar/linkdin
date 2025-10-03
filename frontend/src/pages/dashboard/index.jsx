import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts, createPost, likeIncreaments } from "@/config/redux/action/postAction";
import { getUserAndProfile } from "@/config/redux/action/authAction";
import { useRouter } from "next/router";
import UserLayout from "@/layout/clienLayout/UserLayout";
import Image from "next/image";
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

  // Check for token and redirect if not present
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/login");
    }
  }, [router]);

  // Fetch posts and user profile
  useEffect(() => {
    dispatch(getAllPosts());
    dispatch(getUserAndProfile({ token: localStorage.getItem("token") }));
  }, [dispatch]);

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPostFile(file);

    if (file) {
      const fileURL = URL.createObjectURL(file);
      setPreview(fileURL);
    } else {
      setPreview(null);
    }
  };

  // Revoke object URL
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  // Handle creating a post
  const handleCreatePost = async () => {
    if (!postBody && !postFile) {
      toast.error("Please write something or select a file to post.");
      return;
    }

    setLoading(true);

    try {
      await dispatch(
        createPost({
          CryptoToken: localStorage.getItem("token"),
          body: postBody,
          file: postFile,
        })
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

  if (!authState?.user || !authState?.user?.userId) {
    return (
      <UserLayout>
        <div className="flex items-center justify-center h-screen">
          <p className="text-gray-500 text-lg font-medium">Loading...</p>
        </div>
      </UserLayout>
    );
  }

  const onLike = (id) => {
    dispatch(likeIncreaments(id));
  };

  const profilePic = authState.user.userId?.profilePicture?.path;

  return (
    <UserLayout>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="min-h-screen bg-gray-100 flex">
        {/* Left Sidebar */}
        <aside className="w-1/5 bg-white p-4 overflow-y-auto">
          <ul className="space-y-4 font-medium">
            <li className="cursor-pointer hover:text-teal-600">Scroll</li>
            <li className="cursor-pointer hover:text-teal-600">Discover</li>
            <li className="cursor-pointer hover:text-teal-600">Connections</li>
          </ul>
        </aside>

        {/* Main Feed */}
        <main className="w-3/5 p-6 space-y-6">
          {/* Create Post */}
          <div className="bg-white p-4 rounded-lg shadow space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <Image
                  src={`http://localhost:5001/${profilePic}`}
                  alt={authState.user?.name || "Profile Picture"}
                  width={40}
                  height={40}
                  className="object-cover"
                />
              </div>

              <input
                type="text"
                placeholder="Start a post..."
                className="flex-1 border rounded-full px-4 py-2 focus:outline-none"
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
                className="bg-teal-500 text-white px-4 py-2 rounded-full cursor-pointer"
              >
                Add Photo
              </label>
            </div>

            {/* Preview Image */}
            {preview && (
              <div className="relative mt-2 w-32 h-32 rounded overflow-hidden border border-gray-300">
                <button
                  onClick={() => {
                    setPreview(null);
                    setPostFile(null);
                  }}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold z-10"
                >
                  ×
                </button>

                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-full object-contain"
                />
              </div>
            )}

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

          {/* Posts */}
          {postState.posts && postState.posts.length > 0 ? (
            postState.posts.map((post) => (
              <PostCard key={post._id} post={post} onLike={() => onLike(post._id)} />
            ))
          ) : (
            <p className="text-gray-500">No posts yet.</p>
          )}
        </main>

        {/* Right Sidebar */}
        <aside className="w-1/5 bg-white p-4 space-y-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full bg-gray-300"></div>
            <div>
              <h3 className="font-semibold">Your Name</h3>
              <p className="text-sm text-gray-500">Software Engineer</p>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Connections</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gray-300"></div>
                <span>Riha</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gray-300"></div>
                <span>Asif</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </UserLayout>
  );
}
