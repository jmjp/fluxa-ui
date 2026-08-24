import { PHASE_PRODUCTION_BUILD } from 'next/constants.js';

/** @type {import('next').NextConfig} */
const nextConfig = (phase) => {
  // Valida env vars em producao; em dev, usa fallback.
  // Loga warning mas NAO bloqueia build — Dokploy precisa buildar
  // mesmo sem env vars pra permitir orquestracao flexivel.
  if (phase === PHASE_PRODUCTION_BUILD && !process.env.NEXT_PUBLIC_FLUXA_API_URL) {
    console.warn('WARN: NEXT_PUBLIC_FLUXA_API_URL nao setada; Agent UI vai cair no fallback DEV (127.0.0.1:8080).');
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
