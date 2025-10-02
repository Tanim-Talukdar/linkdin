import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllComment, getAllPosts, likeIncreaments } from "@/config/redux/action/postAction";
import { getUserAndProfile } from "@/config/redux/action/authAction";
import { useRouter } from "next/router";
import UserLayout from "@/layout/clienLayout/UserLayout";
import Image from "next/image";
import PostCard from "@/components/PostCard";

export default function Dashboard() {
  const router = useRouter();
  const [isToken, setToken] = useState(false);

  const dispatch = useDispatch();
  const postState = useSelector((state) => state.post);
  const authState = useSelector((state) => state.auth);

  const profilePic = authState.user?.userId?.profilePicture?.path;

  // Redirect to login if no token
  useEffect(() => {
    if (!localStorage.getItem("token")) router.push("/login");
    setToken(true);
  }, [router]);

  // Fetch posts and user profile
  useEffect(() => {
    dispatch(getAllPosts());
    dispatch(getUserAndProfile({ token: localStorage.getItem("token") }));
  }, [dispatch]);

    const onLike = (id) => {
        dispatch(likeIncreaments(id));
    }

  return (
    <UserLayout>
      <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">

        {/* Left Sidebar */}
        <aside className="w-full md:w-1/5 bg-white p-4 space-y-6 shadow-sm flex flex-row md:flex-col justify-around md:justify-start">
          <ul className="flex md:flex-col justify-around w-full md:w-auto gap-4 font-medium">
            {["Scroll", "Discover", "Connections"].map((item) => (
              <li
                key={item}
                className="cursor-pointer hover:text-teal-600 transition text-center md:text-left"
              >
                {item}
              </li>
            ))}
          </ul>
        </aside>

        {/* Main Feed */}
        <main className="w-full md:w-3/5 p-6 space-y-6">

          {/* Start a Post */}
          <div className="bg-white p-4 rounded-xl shadow flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-teal-500">
              <Image
                src={`http://localhost:5001/${profilePic || "uploads/default.jpg"}`}
                alt={authState.user?.userId?.name || "Profile Picture"}
                width={48}
                height={48}
                className="object-cover"
              />
            </div>
            <input
              type="text"
              placeholder="Start a post..."
              className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
            <button className="bg-teal-500 text-white px-4 py-2 rounded-full hover:bg-teal-600 transition">
              +
            </button>
          </div>

          {/* Posts */}
          {postState.posts && postState.posts.length > 0 ? (
            <div className="space-y-6">
              {postState.posts.map((post) => (
                <PostCard key={post._id} post={post} onLike={() => onLike(post._id)} />
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No posts yet.</p>
          )}
        </main>

        {/* Right Sidebar */}
        <aside className="w-full md:w-1/5 bg-white p-4 space-y-6 shadow-sm mt-6 md:mt-0">

          {/* Profile */}
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-300">
              <Image
                src={`http://localhost:5001/${profilePic || "uploads/default.jpg"}`}
                alt="Your Profile"
                width={48}
                height={48}
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Your Name</h3>
              <p className="text-sm text-gray-500">Software Engineer</p>
            </div>
          </div>

          {/* Connections */}
          <div>
            <h4 className="font-semibold mb-3 text-gray-700">Connections</h4>
            <div className="space-y-3">
              {["Riha", "Asif"].map((name) => (
                <div key={name} className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gray-300"></div>
                  <span className="text-gray-700">{name}</span>
                </div>
              ))}
            </div>
          </div>

        </aside>
      </div>
    </UserLayout>
  );
}
