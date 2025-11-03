// pages/404.jsx
// Modern, simple teal-themed 404 page using Tailwind CSS

import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-teal-50 to-white flex items-center justify-center p-6">
      <div className="max-w-3xl w-full bg-white border border-teal-100 rounded-2xl shadow-md p-10 text-center">
        <h1 className="text-8xl font-extrabold text-teal-600">404</h1>
        <h2 className="mt-4 text-3xl font-bold text-gray-800">Page Not Found</h2>
        <p className="mt-3 text-gray-600 text-lg max-w-md mx-auto">
          Oops! The page you’re looking for doesn’t exist or may have been moved. Please go back to the home page.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/">
            <p className="px-6 py-3 rounded-lg bg-teal-600 text-white font-medium hover:bg-teal-700 transition shadow-sm hover:shadow-md">Go Home</p>
          </Link>
        </div>

        <p className="mt-6 text-sm text-gray-400">Need help? Try checking the navigation or contact our support.</p>
      </div>
    </main>
  );
}