import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.imgur.com',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
      {
        protocol: 'https',
        hostname: 'api.escuelajs.co',
        pathname: '/api/v1/files/**',
      },
    ],
    domains: [
      'i.imgur.com',
      'placehold.co',
      'api.escuelajs.co',
      'res.cloudinary.com',
      'fakestoreapi.com',
    ],
  },
};

export default nextConfig;