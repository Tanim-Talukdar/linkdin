import Link from "next/link"

export default function Navbar() {
  return (
    <>
      <nav className="flex justify-between items-center px-6 py-4 max-w-screen-xl mx-auto">
        <div className="flex items-center gap-1 cursor-pointer">
          <p className="font-sans font-bold italic text-teal-600 text-2xl sm:text-xl md:text-2xl">
            Connector
          </p>
        </div>
        
        
        <div>
          <Link
            href="/login"
            className="p-2 mx-2 bg-teal-600 rounded transition duration-300 hover:drop-shadow-lg hover:bg-transparent hover:border-2 hover:border-teal-600 text-white hover:text-teal-600"
          >
            Login
          </Link>
          <Link
            href="/login"
            className="p-2 bg-teal-600 rounded transition duration-300 hover:drop-shadow-lg hover:bg-transparent hover:border-2 hover:border-teal-600 text-white hover:text-teal-600"
          >
            Register
          </Link>
        </div>
      </nav>
    </>
  )
}
