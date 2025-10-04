/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/wanderlust12/**", // তোমার Cloudinary cloud name
      },
    ],
  },
};

export default nextConfig;
