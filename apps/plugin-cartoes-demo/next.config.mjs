/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'dist',
  transpilePackages: ['@fluxa/plugin-sdk'],
};

export default nextConfig;
