import Head from "next/head";
import Link from "next/link";
import UserLayout from "@/layout/clienLayout/UserLayout";
import { useRouter } from "next/router";

export default function Home() {

  const router = useRouter();

  return (
    <UserLayout>
    <div
      className="text-gray-900 min-h-screen w-full bg-no-repeat bg-cover bg-center"
      style={{ backgroundImage: 'url(/background.png)' }}
    >
      {/* Nav Section */}
      <nav className="flex justify-between items-center px-6 py-4 max-w-screen-xl mx-auto">
        <div className="flex items-center gap-1 cursor-pointer">
          <p className="font-sans italic text-teal-600 text-2xl sm:text-xl md:text-2xl">
            Sweet Home
          </p>
        </div>

        {/* Static Auth Buttons */}
        <div>
          <Link
            href="/auth"
            className="p-2 mx-2 bg-teal-600 rounded transition duration-300 hover:drop-shadow-lg hover:bg-transparent hover:border-2 hover:border-teal-600 text-white hover:text-teal-600"
          >
            Login
          </Link>
          <Link
            href="/auth"
            className="p-2 bg-teal-600 rounded transition duration-300 hover:drop-shadow-lg hover:bg-transparent hover:border-2 hover:border-teal-600 text-white hover:text-teal-600"
          >
            Register
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container max-w-screen-xl mx-auto px-6 py-10 flex flex-col-reverse md:flex-row items-center justify-between min-h-[88vh]">
        <div className="text-center md:text-left max-w-xl mb-10 md:mb-0">
          <p className="text-3xl sm:text-4xl md:text-5xl font-serif leading-snug text-transparent bg-clip-text bg-gradient-to-r from-teal-700 to-teal-300">
            Connect With your Friends without Exaggeration
          </p>
          <br />
          <p className="text-2xl font-serif leading-snug text-teal-800">
            A True social media platform, with stories no blufs!
          </p>
          <br />
          <br />
          <Link
            href="/login"
            className="p-3 bg-teal-600 rounded text-white font-semibold transition duration-300 hover:drop-shadow-lg hover:bg-transparent hover:border-2 hover:border-teal-600 hover:text-teal-600"
          >
            Get Started
          </Link>
        </div>

        <div className="flex justify-center mt-6 md:mt-0 w-full max-w-[40rem] overflow-hidden">
          <img
            src="/home.png"
            alt="mobile"
            className="w-full max-w-full object-contain"
            style={{ filter: "drop-shadow(0 0 15px #14b8a6)" }}
          />
        </div>
      </div>
    </div>
    </UserLayout>
  );
}
