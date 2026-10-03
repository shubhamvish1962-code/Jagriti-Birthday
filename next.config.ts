import type { NextConfig } from "next";

const isGithubActions = process.env.GITHUB_ACTIONS || false;
const repo = isGithubActions ? '/Jagriti-Birthday' : '';

const nextConfig: NextConfig = {
  reactStrictMode: false,
  output: isGithubActions ? 'export' : undefined,
  basePath: repo,
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: repo,
  },
};

export default nextConfig;
