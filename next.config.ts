import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [{ source: "/blogs", destination: "/experience", permanent: true }];
  }
};
export default nextConfig;