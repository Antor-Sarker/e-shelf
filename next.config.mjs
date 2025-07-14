/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      new URL("https://res.cloudinary.com/dhjjlycjb/image/upload/**"),
    ],
  },
};
export default nextConfig;
