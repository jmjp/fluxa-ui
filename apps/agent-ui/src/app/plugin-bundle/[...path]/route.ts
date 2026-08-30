import { NextResponse } from 'next/server';

/**
 * Serve bundles de plugin same-origin.
 *
 * O `loadPluginPanels` do Agent UI faz `import()` numa URL relativa ao proprio
 * host. Se apontasse direto pro servidor do plugin (:3002), o browser faria um
 * module script cross-origin e exigiria CORS. Passando por aqui, o bundle .mjs
 * vem da mesma origem (sem CORS) e segue com content-type de JavaScript.
 */
const PLUGIN_BUNDLE_HOST = (process.env.PLUGIN_BUNDLE_HOST ?? 'http://localhost:3002').replace(/\/$/, '');

/**
 * Roteia o host do bundle pelo nome do arquivo, para servir múltiplos plugins
 * em dev. `PLUGIN_BUNDLE_HOSTS` mapeia `arquivo=host` (separado por `;` ou `,`),
 * ex.: `cartoes.mjs=http://localhost:3002;chat.mjs=http://localhost:3004`.
 * Faz fallback para o `PLUGIN_BUNDLE_HOST` único (contrato original).
 * Lido no load do módulo — mudanças exigem restart/rebuild do Agent UI.
 */
function resolveBundleHost(file: string): string {
  const map = process.env.PLUGIN_BUNDLE_HOSTS ?? '';
  for (const part of map.split(/[;,]/)) {
    const [key, host] = part.trim().split('=');
    if (key && host && key === file) return host.replace(/\/$/, '');
  }
  return PLUGIN_BUNDLE_HOST;
}

export const dynamic = 'force-dynamic';

export async function GET(_req: Request, { params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params;
  const file = path.map(encodeURIComponent).join('/');
  const last = path[path.length - 1];
  if (!last) {
    return NextResponse.json({ error: { message: 'no bundle file' } }, { status: 400 });
  }
  const host = resolveBundleHost(last);
  const target = `${host}/${file}`;
  try {
    const upstream = await fetch(target, { cache: 'no-store' });
    if (!upstream.ok) {
      return new NextResponse(`upstream ${upstream.status}`, { status: upstream.status });
    }
    const body = await upstream.arrayBuffer();
    return new NextResponse(body, {
      headers: {
        'Content-Type': 'text/javascript; charset=utf-8',
        'Cache-Control': 'no-store',
      },
    });
  } catch {
    return NextResponse.json({ error: { message: 'plugin bundle unreachable' } }, { status: 502 });
  }
}
