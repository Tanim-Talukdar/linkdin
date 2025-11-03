// pages/my-connections.jsx
import React, { useEffect } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import DashboardLayout from "@/layout/DashboardLayout";
import { myConnections, acceptConnections } from "@/config/redux/action/authAction";
import { useRouter } from "next/router";

// Skeleton Loader Component
const ConnectionSkeleton = () => (
  <motion.div
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
    </div>
  </motion.div>
);


// Connection Card Component
const ConnectionCard = ({ profile, onAccept, onNavigate }) => {
  const user = profile?.userId || {};
  const name = user.name || "Unknown User";
  const username = user.username || "";
  const profilePicture = user.profilePicture?.path || "/default-avatar.png";
  const isAccepted = profile.status_accepted;

  return (
    <div
      onClick={() => onNavigate(username)}
      className="bg-white p-5 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row gap-5 items-center cursor-pointer"
    >
      <div className="flex items-center gap-4 flex-1">
        <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100 border flex-shrink-0">
          <Image
            src={profilePicture}
            alt={name}
            width={64}
            height={64}
            className="object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold truncate">{name}</h3>
          <p className="text-sm text-gray-500 truncate">@{username}</p>
        </div>
      </div>

      <div className="flex gap-3">
        {isAccepted ? (
          <button
            disabled
            className="px-6 py-2 rounded-lg bg-gray-400 text-white cursor-not-allowed"
          >
            Accepted
          </button>
        ) : (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAccept(profile._id);
            }}
            className="px-6 py-2 rounded-lg bg-teal-500 text-white hover:bg-teal-600 transition"
          >
            Accept
          </button>
        )}
      </div>
    </div>
  );
};

// Main Page Component
export default function MyConnectionsPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { connections, isLoading } = useSelector((state) => state.auth);

  const CryptoToken = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  // Fetch connections on load
  useEffect(() => {
    if (CryptoToken) dispatch(myConnections(CryptoToken));
  }, [dispatch, CryptoToken]);

  // Accept connection request
  const handleAccept = async (requestId) => {
    if (!CryptoToken) return;
    await dispatch(acceptConnections({ CryptoToken, requestId, action_type: "accept" }));
    dispatch(myConnections(CryptoToken));
  };

  // Navigate to user profile
  const handleNavigate = (username) => router.push(`/view-profile?username=${username}`);

  return (
    <DashboardLayout authState={{ connections, isLoading }}>
      <h2 className="text-2xl font-bold mb-6 text-center sm:text-left text-gray-800">
        My Connections
      </h2>

      <div className="grid gap-6 grid-cols-1">
        {isLoading
          ? Array.from({ length: 5 }).map((_, idx) => <ConnectionSkeleton key={idx} />)
          : connections && connections.length > 0
          ? connections.map((profile) => (
              <ConnectionCard
                key={profile._id}
                profile={profile}
                onAccept={handleAccept}
                onNavigate={handleNavigate}
              />
            ))
          : <p className="text-center text-gray-500 col-span-full">No connection requests found.</p>
        }
      </div>
    </DashboardLayout>
  );
}
