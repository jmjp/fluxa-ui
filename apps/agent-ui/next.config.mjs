/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@fluxa/shared'],
  // output: 'standalone' gera um bundle com TODAS as deps copiadas
  // de forma plana (sem symlinks), ideal pra Docker.
  output: 'standalone',
};

export default nextConfig;
