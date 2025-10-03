// components/DashboardLayout.jsx
import React from "react";
import UserLayout from "@/layout/clienLayout/UserLayout";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

export default function DashboardLayout({ children, authState }) {
  const router = useRouter();
  const profilePic = authState?.user?.userId?.profilePicture?.path;

  const sidebarLinks = [
    { name: "Scroll", href: "/dashboard" },
    { name: "Discover", href: "/discover" },
    { name: "Connections", href: "/connections" },
  ];

  return (
    <UserLayout>
      <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
        {/* Left Sidebar */}
        <aside className="bg-white p-4 md:w-1/5 w-full flex-shrink-0">
          <ul className="space-y-4 font-medium flex md:flex-col justify-around md:justify-start">
            {sidebarLinks.map((link) => {
              const isActive = router.pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`cursor-pointer px-2 py-2 rounded block text-center md:text-left ${
                      isActive
                        ? "bg-teal-500 text-white"
                        : "hover:text-teal-600"
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </aside>

        {/* Main Content */}
        <main className="p-6 md:w-3/5 w-full">{children}</main>

        {/* Right Sidebar */}
        <aside className="bg-white p-4 md:w-1/5 w-full flex-shrink-0 mt-6 md:mt-0">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 rounded-full overflow-hidden">
              {profilePic ? (
                <Image
                  src={`http://localhost:5001/${profilePic}`}
                  alt="Profile"
                  width={48}
                  height={48}
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-300" />
              )}
            </div>
            <div className="truncate">
              <h3 className="font-semibold truncate">{authState?.user?.name || "Your Name"}</h3>
              <p className="text-sm text-gray-500 truncate">Software Engineer</p>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Connections</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gray-300"></div>
                <span className="truncate">Riha</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gray-300"></div>
                <span className="truncate">Asif</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </UserLayout>
  );
}
