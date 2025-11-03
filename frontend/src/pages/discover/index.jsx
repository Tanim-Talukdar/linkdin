import React, { useEffect } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import DashboardLayout from "@/layout/DashboardLayout";
import {
  getAllUser,
  sendConnectionRequest,
  getSentConnections,
} from "@/config/redux/action/authAction";
import { useRouter } from "next/router";

export default function DiscoverPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const authState = useSelector((state) => state.auth);
  const isLoading = authState.isLoading;

  useEffect(() => {
    dispatch(getAllUser());
    const CryptoToken = localStorage.getItem("token");
    if (CryptoToken) {
      dispatch(getSentConnections(CryptoToken));
    }
  }, [dispatch]);

  const sendConection = async (connectionId) => {
    const CryptoToken = localStorage.getItem("token");
    await dispatch(sendConnectionRequest({ CryptoToken, connectionId }));
    dispatch(getSentConnections(CryptoToken));
  };

  const profiles = authState?.allUser?.profile || [];

  // Exclude current user's profile
  const filteredProfiles = profiles.filter(
    (profile) => profile?.userId?._id !== authState?.myProfile?.userId?._id
  );

  const handleNavigate = (username) => {
    if (username) {
      router.push(`/view-profile?username=${username}`);
    }
  };

  // Check if connection request already sent
  const isRequested = (profileId) => {
    return authState?.connectionRequest?.some(
      (req) => req.connectionId === profileId
    );
  };

  // === Modern Loading Skeleton ===
  if (isLoading) {
    return (
      <DashboardLayout authState={authState}>
        <div className="grid gap-6 grid-cols-1">
          {[1, 2, 3, 4, 5].map((_, idx) => (
            <motion.div
              key={idx}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="bg-white p-5 rounded-2xl shadow-md flex flex-col gap-4"
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gray-300 rounded-full" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-300 rounded w-3/4" />
                  <div className="h-3 bg-gray-300 rounded w-1/2" />
                </div>
              </div>
              <div className="h-3 bg-gray-300 rounded w-full mt-2" />
              <div className="flex gap-2 mt-3">
                <div className="h-8 bg-gray-300 rounded flex-1" />
                <div className="h-8 bg-gray-300 rounded flex-1" />
              </div>
            </motion.div>
          ))}
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout authState={authState}>
      <h2 className="text-2xl font-bold mb-6 text-center sm:text-left text-gray-800">
        Discover People
      </h2>

      {/* Responsive Grid */}
      <div className="grid gap-6 grid-cols-1">
        {filteredProfiles.length > 0 ? (
          filteredProfiles.map((profile) => {
            const name = profile?.userId?.name || "Unknown User";
            const username = profile?.userId?.username || "";
            const currentPost =
              profile?.currentPost || "No current position available";
            const bio = profile?.bio || "No bio available";
            const education = profile?.education || [];
            const pastWork = profile?.pastWork || [];

            return (
              <div
                key={profile?.userId?._id}
                className="bg-white p-5 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col cursor-pointer"
                onClick={() => handleNavigate(username)}
              >
                {/* Profile Layout */}
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-5">
                  {/* Left Section (Profile Info) */}
                  <div className="flex-1">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100 flex-shrink-0 border">
                        <Image
                          src={profile?.userId?.profilePicture?.path}
                          alt={name}
                          width={64}
                          height={64}
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold truncate text-gray-800">
                          {name}
                        </h3>
                        <p className="text-sm text-gray-500 truncate">
                          @{username}
                        </p>
                        <p className="text-sm text-gray-500 truncate italic">
                          {currentPost}
                        </p>
                      </div>
                    </div>

                    <p className="mt-3 text-gray-600 text-sm line-clamp-3">
                      {bio}
                    </p>

                    {/* Buttons */}
                    <div className="mt-4 flex flex-wrap gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (!isRequested(profile?.userId?._id)) {
                            sendConection(profile?.userId?._id);
                          }
                        }}
                        className={`flex-1 min-w-[90px] px-4 py-2 rounded-lg transition ${
                          isRequested(profile?.userId?._id)
                            ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                            : "bg-teal-500 text-white hover:bg-teal-600"
                        }`}
                        disabled={isRequested(profile?.userId?._id)}
                      >
                        {isRequested(profile?.userId?._id)
                          ? "Requested"
                          : "Connect"}
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleNavigate(username);
                        }}
                        className="flex-1 min-w-[90px] bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition"
                      >
                        View Profile
                      </button>
                    </div>
                  </div>

                  {/* Right Section (Education & Work) */}
                  <div className="flex-1 md:border-l md:pl-5 border-gray-200">
                    {education.length > 0 && (
                      <div className="mb-3">
                        <h4 className="font-semibold text-gray-700 mb-1">
                          Education
                        </h4>
                        <ul className="text-gray-600 text-sm space-y-1">
                          {education.map((edu, i) => (
                            <li key={i} className="truncate">
                              {edu?.degree || "Degree not specified"}{" "}
                              {edu?.fieldOfStudy ? `in ${edu.fieldOfStudy}` : ""}{" "}
                              {edu?.school ? `, ${edu.school}` : ""}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {pastWork.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-gray-700 mb-1">
                          Past Work
                        </h4>
                        <ul className="text-gray-600 text-sm space-y-1">
                          {pastWork.map((work, i) => (
                            <li key={i} className="truncate">
                              {work?.position || "Position not specified"}{" "}
                              {work?.company ? `at ${work.company}` : ""}{" "}
                              {work?.years ? `(${work.years})` : ""}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No profiles found.
          </p>
        )}
      </div>
    </DashboardLayout>
  );
}
