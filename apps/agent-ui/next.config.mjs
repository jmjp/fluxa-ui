/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@fluxa/shared'],
  // PRD §6.5: Agent UI hospeda bundles de plugin via Module Federation.
  // Em produção, plugins publicam seus bundles em URLs estaticas
  // (CDN) e o agent-ui resolve em runtime.
  experimental: {
    // Configuracao de Module Federation virá aqui (fase 2 da UI)
  },
};

export default nextConfig;
