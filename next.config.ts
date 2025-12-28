import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // External packages for serverless PDF generation
  serverExternalPackages: ["puppeteer-core", "@sparticuz/chromium-min"],
};

export default nextConfig;
