/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@relique/shared", "@relique/ui"],
  experimental: {
    externalDir: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;

