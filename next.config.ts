import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "i.pravatar.cc", // Pravatar
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "api.dicebear.com", //  Dicebear 
        port: "",
        pathname: "/**",
      },
      {
          
        protocol: "https",
        hostname: "res.cloudinary.com", 
      
      },
    ],
  },
  reactCompiler: true,
};

export default nextConfig;