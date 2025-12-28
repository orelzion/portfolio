import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Force include @sparticuz/chromium binaries in serverless function
  outputFileTracingIncludes: {
    '/api/generate-pdf': ['./node_modules/@sparticuz/chromium/**/*'],
  },
  
  // Exclude chromium from being processed by webpack
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals = config.externals || [];
      config.externals.push('@sparticuz/chromium');
    }
    return config;
  },
};

export default nextConfig;
