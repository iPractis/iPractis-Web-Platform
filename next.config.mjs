/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // 🔑 THIS IS THE IMPORTANT FIX
    unoptimized: true,

    // You can keep these safely
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.youtube.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "flagcdn.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },

  env: {
    BASE_URL: process.env.BASE_URL,
  },
};

export default nextConfig;
