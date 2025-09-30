import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts } from '@/config/redux/action/postAction';
import { useRouter } from 'next/router';
import { getUserAndProfile } from '@/config/redux/action/authAction';
import UserLayout from '@/layout/clienLayout/UserLayout';
import Image from "next/image";
import PostCard from '@/components/PostCard';

export default function Dashboard() {
  const router = useRouter();
  const [isToken , setToken] = useState("");
  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      router.push("/login")
    }
    setToken(true)
  }, [isToken])
  

  const dispatch = useDispatch();
  const postState = useSelector((state) => state.post);
  const authState = useSelector((state) => state.auth);
  
  const profilePic = authState.user.userId?.profilePicture?.path ;

  useEffect(() => {
    dispatch(getAllPosts());
    dispatch(getUserAndProfile({token: localStorage.getItem("token")}));
  }, [dispatch]);

  // useEffect(() => {
  //   if (postFected) {
    
  //   }
    
  // }, [posts,postFected]);

  return (
    <UserLayout>
          <div className="min-h-screen bg-gray-100 flex">
      {/* Left Sidebar */}
      <aside className="w-1/5 bg-white p-4  overflow-y-auto">
        <ul className="space-y-4 font-medium">
          <li className="cursor-pointer hover:text-teal-600">Scroll</li>
          <li className="cursor-pointer hover:text-teal-600">Discover</li>
          <li className="cursor-pointer hover:text-teal-600">Connections</li>
          
        </ul>
      </aside>

      {/* Main Feed */}
      <main className="w-3/5 p-6 space-y-6">
        {/* Start a Post */}
        <div className="bg-white p-4 rounded-lg shadow flex items-center space-x-3">
          {/* Profile Picture */}
          <div className="w-10 h-10 rounded-full overflow-hidden">
        <Image
          src={`http://localhost:5001/${profilePic}`} // replace with your server path
          alt={authState.user?.name || "Profile Picture"}
          width={40}
          height={40}
          className="object-cover"
        />
      </div>

          {/* Input Field */}
          <input
            type="text"
            placeholder="Start a post..."
            className="flex-1 border rounded-full px-4 py-2 focus:outline-none"
          />

          {/* Plus Button */}
          <button className="bg-teal-500 text-white px-4 py-2 rounded-full">
            +
          </button>
        </div>

        {/* Example Post Card */}
{/* Dynamic Posts */}
{postState.posts && postState.posts.length > 0 ? (
  postState.posts.map((post) => (
    <PostCard key={post._id} post={post} />
  ))
) : (
  <p className="text-gray-500">No posts yet.</p>
)}
      </main>

      {/* Right Sidebar */}
      <aside className="w-1/5 bg-white p-4 space-y-6">
        {/* Top Profile */}
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-full bg-gray-300"></div>
          <div>
            <h3 className="font-semibold">Your Name</h3>
            <p className="text-sm text-gray-500">Software Engineer</p>
          </div>
        </div>

        {/* Connections */}
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
