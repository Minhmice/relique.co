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
  // Use webpack explicitly for Payload CMS compatibility
  webpack: (config, { isServer }) => {
    // Only apply alias on server side if needed
    if (isServer) {
      try {
        const path = require('path');
        const postgresPath = require.resolve('@payloadcms/db-postgres');
        config.resolve.alias = {
          ...config.resolve.alias,
          '@payloadcms/db-postgres': postgresPath,
        };
      } catch (e) {
        // Ignore if module not found - will be installed later
      }
    } else {
      // Client-side: exclude Node.js modules and Payload config
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        dns: false,
        child_process: false,
      };
      // Exclude payload.config from client bundle
      config.resolve.alias = {
        ...config.resolve.alias,
        '../../../payload.config': false,
        '../../../../payload.config': false,
      };
    }
    return config;
  },
};

export default nextConfig;

