# Fluxa UI

Repositorio unico de UI do Fluxa (monorepo): **Agent UI** (atendente) + **Admin UI** (administrador).

## Arquitetura

```
fluxa-ui/
├── apps/
│   ├── agent-ui/     # Painel do atendente (Next.js 15, porta 3000)
│   └── admin-ui/     # Painel administrativo (Next.js 15, porta 3001)
├── packages/
│   ├── ui/           # Primitivos shadcn/ui (Button, Card, Badge, ...)
│   └── shared/       # Tipos + cliente HTTP da API core (espelha entities)
├── package.json      # Workspace root
├── turbo.json         # Pipeline (build, dev, lint, typecheck)
└── pnpm-workspace.yaml
```

## Stack

- **Next.js 15** + App Router + **React 19** + **TypeScript 5.7**
- **shadcn/ui** primitives (Button, Card, Badge, Dialog, ...)
- **Tailwind CSS 3.4** + **tailwindcss-animate**
- **pnpm workspaces** + **Turborepo** (cache local, pipeline paralelo)
- **Radix UI** (acessibilidade por baixo dos shadcn)
- **React Flow 11** (apenas no Admin UI, para o editor de workflow)
- **Module Federation** planejado para Fase 2 (bundles de plugin de step)

## Pré-requisitos

- Node >= 20
- pnpm >= 10 (via `corepack enable && corepack prepare pnpm@latest --activate`)
- Core Fluxa rodando em `http://127.0.0.1:8080` (configurável via env)

## Setup

```bash
# na raiz do repo
corepack enable
pnpm install
```

## Desenvolvimento

```bash
# ambos os apps em paralelo
pnpm dev

# só Agent UI
pnpm dev:agent    # http://localhost:3000

# só Admin UI
pnpm dev:admin    # http://localhost:3001
```

## Configuração (env)

Cada app lê a URL da API core via env. Defaults: `http://127.0.0.1:8080`.

```bash
# apps/agent-ui/.env.local
NEXT_PUBLIC_FLUXA_API_URL=http://127.0.0.1:8080

# apps/admin-ui/.env.local
NEXT_PUBLIC_FLUXA_API_URL=http://127.0.0.1:8080
```

## Build de produção

```bash
pnpm build
```

Builda todos os apps em paralelo via Turborepo. Saída em cada `apps/*/.next/`.

## Estrutura interna de um app

```
apps/<app>/src/
├── app/                # Next.js App Router (rotas server/client)
│   ├── layout.tsx      # Root layout (html, body, providers)
│   ├── page.tsx        # Home page (server component, fetch inicial)
│   └── globals.css     # Tailwind base + CSS vars (light/dark)
├── components/         # Componentes de domínio (Inbox, PluginsList, ...)
│   └── ui/             # (legado, agora em packages/ui)
└── lib/                # (legado, agora em packages/ui)
```

## Como plugins publicam UI (Fase 2 da UI)

PRD §6.5: cada plugin pode publicar um bundle JS que o Agent UI carrega
em runtime via Module Federation.

```
plugin-cartoes/
├── plugin.yaml         # declara capability "step.cartoes" + bundle
├── ui/                 # bundle React exportado
│   ├── CartoesPanel.tsx
│   ├── manifest.json
│   └── dist/cartoes-panel.js   # expõe o componente via Module Federation
```

O Agent UI resolve o bundle em runtime lendo `capabilities.ui.bundle_url` e
`capabilities.ui.component_name` da API core (a entidade `PluginCapabilityUI`
em `@fluxa/shared/types/plugin`).

Configuração de Module Federation ainda não foi adicionada (`next.config.mjs`
tem placeholder). Vai ser feita na Fase 2 da UI (apos a Fase 4 do core).

## Scripts uteis

```bash
pnpm lint            # ESLint em todos os pacotes
pnpm typecheck       # tsc --noEmit em todos os pacotes
pnpm test            # vitest/jest em todos os pacotes
pnpm format          # Prettier write
pnpm format:check    # Prettier check (CI)
```

## Repos relacionados

- [`jmjp/fluxa-api`](https://github.com/jmjp/fluxa-api) — Core backend (Go)
- [`jmjp/plugin-triagem`](https://github.com/jmjp/plugin-triagem) — Plugin de etapa
- [`jmjp/plugin-channel-webchat`](https://github.com/jmjp/plugin-channel-webchat) — Plugin de canal
- [`jmjp/plugin-llm-claude`](https://github.com/jmjp/plugin-llm-claude) — Plugin LLM

## Roadmap de UI

- [x] Skeleton: monorepo, workspaces, apps, pacotes, tipos, API client
- [x] Agent UI: lista de conversas + thread + painel de step (esqueleto)
- [x] Admin UI: lista de plugins
- [ ] Agent UI: WebSocket para eventos em tempo real (PRD §8.2)
- [ ] Agent UI: Module Federation para bundles de plugin de step
- [ ] Admin UI: editor visual de workflow (React Flow)
- [ ] Admin UI: tela de Canais (bind + status)
- [ ] Admin UI: tela de Filas (criar, associar workflows/agentes)
- [ ] Admin UI: aba Marketplace (catálogo, 1-click install, upload air-gapped)
- [ ] Shared: SDK gerado a partir do OpenAPI do core (substituir @fluxa/shared/api)
