/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: false,
  skipTrailingSlashRedirect: true,
  images: {
    domains: ["avatars.githubusercontent.com"],
  },
  async rewrites() {
    return [
      {
        source: "/ru",
        destination: "/ru/",
      },
      {
        source: "/kk",
        destination: "/kk/",
      },
    ];
  },
};
export default nextConfig;
