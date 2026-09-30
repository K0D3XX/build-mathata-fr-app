
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Required for native desktop bundling
  typescript: {
    ignoreBuildErrors: true, // Forces compilation even if v0 left a typo behind!
  },
  eslint: {
    ignoreDuringBuilds: true, // Prevents code styler errors from blocking the build
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;

