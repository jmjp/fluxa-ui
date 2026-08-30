import type { PluginCapabilityUI } from '@fluxa/shared';

/**
 * Capacidades de plugins expostas ao painel de atendimento.
 *
 * O Agent UI serve os bundles via rota same-origin `/plugin-bundle/*` (veu
 * `src/app/plugin-bundle/[...path]/route.ts`), entao o `import()` remoto do
 * loader nunca cruza CORS com a origem do plugin. A `baseURL` acima aponta pra
 * origem do proprio host (porta 3000 em dev, ou a URL publicada em prod).
 *
 * O manifest aponta pro bundle ESM publicado pelo plugin (gerado por
 * `pnpm build:bundle` no app do plugin). O export `default` conte m o array de
 * painéis que o `loadPluginPanels` registra nas slots.
 */
const HOST_ORIGIN = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000';

export const PLUGIN_CAPABILITIES: Array<{ baseURL: string; manifest: PluginCapabilityUI }> = [
  {
    baseURL: HOST_ORIGIN,
    manifest: {
      id: 'ui.cartoes',
      display_name: 'Cartões',
      bundle_url: '/plugin-bundle/cartoes.mjs',
      component_export: 'default',
      slots: [
        { name: 'main', display_name: 'Cartões' },
        { name: 'sidebar', display_name: 'Dados do cartão' },
      ],
    },
  },
  {
    baseURL: HOST_ORIGIN,
    manifest: {
      id: 'ui.chat',
      display_name: 'Chat',
      bundle_url: '/plugin-bundle/chat.mjs',
      component_export: 'default',
      slots: [
        { name: 'main', display_name: 'Conversa simulada' },
        { name: 'sidebar', display_name: 'Contexto da conversa' },
      ],
    },
  },
];
