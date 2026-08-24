import { PHASE_PRODUCTION_BUILD } from 'next/constants.js';

/** @type {import('next').NextConfig} */
const nextConfig = (phase) => {
  if (phase === PHASE_PRODUCTION_BUILD && !process.env.NEXT_PUBLIC_FLUXA_API_URL) {
    throw new Error('NEXT_PUBLIC_FLUXA_API_URL deve estar setada durante o build do Agent UI.');
  }

  return {
    reactStrictMode: true,
    transpilePackages: ['@fluxa/shared'],
    // output: 'standalone' gera um bundle com TODAS as deps copiadas
    // de forma plana (sem symlinks), ideal pra Docker.
    output: 'standalone',
  };
};

export default nextConfig;
