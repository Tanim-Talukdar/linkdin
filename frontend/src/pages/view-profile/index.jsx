import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { userDetail, sendConnectionRequest, getSentConnections } from "@/config/redux/action/authAction";
import { useRouter } from "next/router";
import DashboardLayout from "@/layout/DashboardLayout";

const ViewProfile = () => {
  const router = useRouter();
  const { username } = router.query;
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  const user = useSelector((state) => state.auth.user);
  const isLoading = useSelector((state) => state.auth.isLoading);
  const [requested, setRequested] = useState(false);

  useEffect(() => {
    if (username) {
      dispatch(userDetail(username));
    }
  }, [dispatch, username]);

  useEffect(() => {
    const CryptoToken = localStorage.getItem("token");
    if (CryptoToken) {
      dispatch(getSentConnections(CryptoToken));
    }
  }, [dispatch]);

  // Check if connection request already sent
  useEffect(() => {
    if (user && authState?.connectionRequest) {
      const isReq = authState.connectionRequest.some(
        (req) => req.connectionId === user?.userId?._id
      );
      setRequested(isReq);
    }
  }, [authState.connectionRequest, user]);

  const handleConnect = async () => {
    const CryptoToken = localStorage.getItem("token");
    if (!requested && user) {
      await dispatch(sendConnectionRequest({ CryptoToken, connectionId: user?.userId?._id }));
      dispatch(getSentConnections(CryptoToken));
      setRequested(true); // Update button state
    }
  };

  if (isLoading || !user) {
    return (
      <DashboardLayout authState={authState}>
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="w-32 h-32 bg-gray-300 rounded-full mb-4"
          ></motion.div>
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="h-6 w-48 bg-gray-300 rounded mb-2"
          ></motion.div>
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="h-4 w-32 bg-gray-300 rounded"
          ></motion.div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout authState={authState}>
      <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-4xl flex flex-col sm:flex-row items-center sm:justify-between gap-6"
        >
          <div className="flex items-center space-x-5">
            <Image
              src={user.profilePicture?.path || "/default.jpg"}
              alt={user.name}
              width={120}
              height={120}
              className="rounded-full object-cover border-4 border-teal-500 shadow-md"
            />
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{user.name}</h1>
              <p className="text-gray-500">@{user?.userId?.username}</p>
              <p className="text-gray-600 mt-1 text-sm">{user?.userId?.bio || "No bio added yet"}</p>
              <p className="text-gray-400 text-xs mt-1">{user?.userId?.location || "Unknown location"}</p>
            </div>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={handleConnect}
              disabled={requested}
              className={`px-5 py-2 rounded-xl shadow-md font-medium transition ${
                requested
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-teal-500 hover:bg-teal-600 text-white"
              }`}
            >
              {requested ? "Requested" : "Connect"}
            </button>
            <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-5 py-2 rounded-xl shadow-md font-medium">
              Message
            </button>
          </div>
        </motion.div>

        {/* About Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-white rounded-2xl shadow-md p-6 w-full max-w-4xl"
        >
          <h2 className="text-xl font-semibold mb-2">About</h2>
          <p className="text-gray-700 text-sm sm:text-base">
            {user.currentPost || "No posts or description added yet."}
          </p>
        </motion.div>

        {/* Work & Education Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="bg-white rounded-2xl shadow-md p-6 w-full max-w-4xl flex flex-col sm:flex-row gap-6"
        >
          {/* Work */}
          <div className="flex-1">
            <h2 className="text-lg font-semibold mb-3">Work Experience</h2>
            {user.pastWork.length > 0 ? (
              <ul className="space-y-2">
                {user.pastWork.map((job, idx) => (
                  <motion.li
                    key={idx}
                    className="border-l-4 border-teal-500 pl-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <p className="font-medium text-gray-800">{job.role}</p>
                    <p className="text-gray-600 text-sm">{job.company}</p>
                    <p className="text-gray-400 text-xs">{job.duration}</p>
                  </motion.li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-400 text-sm">No work experience added.</p>
            )}
          </div>

          {/* Education */}
          <div className="flex-1">
            <h2 className="text-lg font-semibold mb-3">Education</h2>
            {user.education.length > 0 ? (
              <ul className="space-y-2">
                {user.education.map((edu, idx) => (
                  <motion.li
                    key={idx}
                    className="border-l-4 border-teal-500 pl-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <p className="font-medium text-gray-800">{edu.degree}</p>
                    <p className="text-gray-600 text-sm">{edu.institute}</p>
                    <p className="text-gray-400 text-xs">{edu.duration}</p>
                  </motion.li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-400 text-sm">No education added.</p>
            )}
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default ViewProfile;
