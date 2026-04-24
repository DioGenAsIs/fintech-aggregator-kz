/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: false,
  skipTrailingSlashRedirect: true,
  images: {
    domains: ["avatars.githubusercontent.com"],
  },
};
export default nextConfig;
