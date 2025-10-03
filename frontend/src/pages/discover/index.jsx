// pages/discover.jsx
import React, { useEffect } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import DashboardLayout from "@/layout/DashboardLayout";
import { getAllUser } from "@/config/redux/action/authAction";

export default function DiscoverPage() {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getAllUser());
  }, [dispatch]);

  const profiles = authState?.allUser?.profile || [];

  const getFullURL = (path) => {
    if (!path) return "http://localhost:5001/uploads/default.jpg";
    if (path.startsWith("http")) return path;
    return `http://localhost:5001/${path}`;
  };

  return (
    <DashboardLayout authState={authState}>
      <h2 className="text-2xl font-bold mb-6 text-center sm:text-left text-gray-800">
        Discover People
      </h2>

      {/* Responsive Grid */}
      <div className="grid gap-6 grid-cols-1">
        {profiles.length > 0 ? (
          profiles.map((profile) => {
            const name = profile?.userId?.name || "Unknown User";
            const username = profile?.userId?.username
              ? `@${profile.userId.username}`
              : "";
            const currentPost =
              profile?.currentPost || "No current position available";
            const bio = profile?.bio || "No bio available";
            const education = profile?.education || [];
            const pastWork = profile?.pastWork || [];

            return (
              <div
                key={profile?.userId?._id || Math.random()}
                className="bg-white p-5 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col"
              >
                {/* Profile Layout */}
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-5">
                  
                  {/* Left Section (Profile Info) */}
                  <div className="flex-1">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100 flex-shrink-0 border">
                        <Image
                          src={getFullURL(profile?.userId?.profilePicture?.path)}
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
                        <p className="text-sm text-gray-500 truncate">{username}</p>
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
                      <button className="flex-1 min-w-[90px] bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition">
                        Connect
                      </button>
                      <button className="flex-1 min-w-[90px] bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition">
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
