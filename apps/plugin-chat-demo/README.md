# Plugin de Chat (demo)

Plugin de **etapa** do Fluxa que simula a conversa entre um **cliente** e um
**atendente**, portando fielmente o protótipo `fluxa-chat-widget.html`
(Reconstrução Omnichannel **Preto e Branco**: mesmo palette oklch monocromático,
mesmas métricas, mesmas interações).

Constrói sobre o contrato de UI em `@fluxa/plugin-sdk` (`definePanel`,
`PluginPanelProps`, `PluginAction`).

## Painéis

- **`main` — "Conversa simulada"**: a thread cliente × atendente. O cliente
  digita pelo composer (bolha accent à direita); a Fluxa responde com atraso de
  digitação (bolha surface à esquerda), exibe a ficha do pedido, guia até a
  resolução e oferece avaliação por estrelas.
- **`sidebar` — "Contexto da conversa"**: pedido identificado + contexto
  acumulado + ações de transição (`suggest_transition`) e atualização de contexto
  (`context_update`) para o Agent UI.

O estado visual e o CSS viajam dentro do próprio bundle (escopados sob `.fcw`),
pois os painéis são carregados como ESM remoto e o Tailwind do host não os alcança.

## Executar o preview (porta 3004)

```bash
pnpm install            # na raiz do fluxa-ui
pnpm dev                # em apps/plugin-chat-demo → http://localhost:3004
```

## Gerar o bundle para o Agent UI

```bash
pnpm build:bundle       # → public/chat.mjs
```

O bundle NÃO importa `react`: o JSX é compilado para
`globalThis.__FLUXA_REACT__.createElement`, usando a instância de React do host
(via `setReactBridge`). Valide com:

```bash
grep -c "__FLUXA_REACT__" public/chat.mjs     # > 0
grep -E 'from "react"|require\("react"\)' public/chat.mjs   # vazio
```

## Verificação

```bash
pnpm typecheck          # tsc --noEmit
pnpm build              # next build (static export → dist/)
```

## Registrar no Agent UI

A capability já está declarada em
`apps/agent-ui/src/lib/plugin-capabilities.ts` (`id: 'ui.chat'`,
`bundle_url: '/plugin-bundle/chat.mjs'`). O Agent UI serve o bundle pelo proxy
same-origin `plugin-bundle/*`, que aponta para `PLUGIN_BUNDLE_HOST`
(default `http://localhost:3002`).

> ⚠️ Roteamento de bundle: o proxy suporta **um** `PLUGIN_BUNDLE_HOST` por vez.
> O plugin de cartões também serve em `:3002`. Para ver `chat.mjs` embutido no
> Agent UI, aponte `PLUGIN_BUNDLE_HOST` para o servidor que publica o `chat.mjs`
> (ex.: `http://localhost:3004`) — ou publique ambos no mesmo host. O preview
> standalone em `:3004` não depende disso.
