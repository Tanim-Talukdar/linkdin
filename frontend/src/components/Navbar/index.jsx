import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Image from "next/image";
import { getUserAndProfile } from "@/config/redux/action/authAction";
import { useRouter } from "next/router";

export default function Navbar() {
  const authState = useSelector((state) => state.auth);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
    useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && !authState.profileFetched) {
      dispatch(getUserAndProfile({ token }));
    }
  }, [ authState.profileFetched, dispatch]);

  const toggleMenu = () => setMenuOpen(!menuOpen);

    const handleNavigate = (username) => {
    if (username) {
      router.push(`/view-profile?username=${username}`);
    }
  };


  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-screen-xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer">
          <p className="font-sans font-bold italic text-teal-600 text-2xl sm:text-xl md:text-2xl">
            Connector
          </p>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          {authState.profileFetched ? (
            <>
              <div className="flex items-center gap-3" onClick={() => handleNavigate(authState.myProfile.userId.username)}>
                <div className="w-10 h-10 rounded-full cursor-pointer overflow-hidden border-2 border-teal-500">
                  <Image
                    src={authState.myProfile.userId.profilePicture?.path || "/default.jpg"}
                    alt="Profile"
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                </div>
                <p className="text-gray-700 font-medium cursor-pointer">
                  Hey {authState.myProfile.userId.name}
                </p>
              </div>
              <Link
                href="/edit"
                className="px-4 py-2 bg-teal-500 text-white rounded-lg shadow hover:bg-teal-600 transition"
              >
                Edit Your Profile
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="px-4 py-2 bg-teal-500 text-white rounded-lg shadow hover:bg-teal-600 transition"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="px-4 py-2 border-2 border-teal-500 text-teal-500 rounded-lg hover:bg-teal-500 hover:text-white transition"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleMenu}
            className="text-gray-700 focus:outline-none"
          >
            {menuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-md px-6 py-4 space-y-4">
          {authState.profileFetched ? (
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-teal-500">
                  <Image
                    src={authState?.myProfile?.userId?.profilePicture?.path || "/default.jpg"}
                    alt="Profile"
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                </div>
                <p className="text-gray-700 font-medium">
                  Hey {authState.myProfile.userId.name}
                </p>
              </div>
              <Link
                href="/profile"
                className="px-4 py-2 bg-teal-500 text-white rounded-lg shadow hover:bg-teal-600 transition"
              >
                Profile
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <Link
                href="/login"
                className="px-4 py-2 bg-teal-500 text-white rounded-lg shadow hover:bg-teal-600 transition"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="px-4 py-2 border-2 border-teal-500 text-teal-500 rounded-lg hover:bg-teal-500 hover:text-white transition"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
