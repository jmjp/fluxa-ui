import { NextRequest, NextResponse } from 'next/server';

/**
 * Proxy generico pra qualquer /api/<recurso>/<...> do core Fluxa
 * (exceto /api/auth/* que ja tem handler dedicado em
 * apps/agent-ui/src/app/api/auth/[...path]/route.ts).
 *
 * No App Router do Next 15, rotas mais especificas vencem:
 *   /api/auth/[...path]/route.ts   <- pega /api/auth/me, /api/auth/login, ...
 *   /api/[...path]/route.ts        <- pega todo o resto (conversations, agents, workflows)
 *
 * Esse arquivo existe porque rotas catch-all `/api/<recurso>/[...path]`
 * NAO capturam a raiz `/api/<recurso>` (retorna 404). O handler raiz
 * deste arquivo processa o path inteiro como string e encaminha pro core.
 *
 * Le o token do cookie `auth_token` (setado pelo fluxo de login) e
 * repassa como Authorization: Bearer pro core. Sem cookie -> 401.
 */

const CORE_URL = (process.env.NEXT_PUBLIC_FLUXA_API_URL ?? '').replace(/\/$/, '');

// Recursos que NAO sao proxyados (tem handler dedicado mais acima).
const SKIP_PREFIXES = ['auth'];

function bearerFromCookie(req: NextRequest): string | null {
  const raw = req.cookies.get('auth_token')?.value;
  if (!raw) return null;
  try {
    return decodeURIComponent(raw);
  } catch {
    return raw;
  }
}

async function proxy(req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  if (!CORE_URL) {
    return NextResponse.json({ error: { message: 'core nao configurado' } }, { status: 503 });
  }

  const { path } = await params;
  const first = path[0];
  if (first && SKIP_PREFIXES.includes(first)) {
    // Defensivo: na pratica o /api/auth/[...path] especifico ja capturou,
    // mas se cair aqui devolvemos 404 explicito.
    return NextResponse.json({ error: { message: 'recurso nao proxied' } }, { status: 404 });
  }

  const token = bearerFromCookie(req);
  if (!token) {
    return NextResponse.json({ error: { message: 'auth_token ausente' } }, { status: 401 });
  }

  const target = `${CORE_URL}/api/v1/${path.join('/')}`;
  const headers = new Headers();
  headers.set('Authorization', `Bearer ${token}`);
  if (req.headers.get('content-type')) {
    headers.set('Content-Type', req.headers.get('content-type')!);
  }
  const init: RequestInit = { method: req.method, headers };
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    init.body = await req.text();
  }
  try {
    const resp = await fetch(target, init);
    const data = await resp.text();
    return new NextResponse(data, {
      status: resp.status,
      headers: { 'content-type': resp.headers.get('content-type') ?? 'application/json' },
    });
  } catch (e) {
    return NextResponse.json({ error: { message: 'core unreachable' } }, { status: 502 });
  }
}

export const GET = proxy;
export const POST = proxy;
export const PUT = proxy;
export const DELETE = proxy;
export const PATCH = proxy;