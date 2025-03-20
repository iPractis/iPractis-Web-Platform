/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
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
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
        pathname: '/**',
      },
    ],
  },

  env: {
    BASE_URL: process.env.BASE_URL,
  },
};

export default nextConfig;
