/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "5001",           // তোমার backend port
        pathname: "/uploads/**" // যে path এ images আছে
      }
    ]
  }
};

export default nextConfig;
