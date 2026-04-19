/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: false,
  skipTrailingSlashRedirect: true,
  images: {
    domains: ["avatars.githubusercontent.com"],
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "tengimarket.kz" }],
        destination: "https://www.tengimarket.kz/:path*",
        permanent: true,
      },
    ];
  },
};
export default nextConfig;
