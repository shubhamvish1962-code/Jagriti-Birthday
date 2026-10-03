import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false, // Three.js / R3F works better without double-invoke
};

export default nextConfig;
