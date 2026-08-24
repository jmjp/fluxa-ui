import { NextRequest, NextResponse } from 'next/server';

/**
 * Proxy pra /api/v1/auth/* do core Fluxa.
 *
 * O frontend chama /api/auth/login (next route) em vez de chamar o
 * core direto. O Next (server-side) faz fetch no core, evitando:
 * - CORS preflight no browser
 * - Problemas de mixed-content
 * - CORS misconfig no Dokploy
 */

const CORE_URL = (process.env.NEXT_PUBLIC_FLUXA_API_URL ?? '').replace(/\/$/, '');

async function proxy(req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  if (!CORE_URL) {
    return NextResponse.json({ error: { message: 'core nao configurado' } }, { status: 503 });
  }
  const { path } = await params;
  const target = `${CORE_URL}/api/v1/auth/${path.join('/')}`;
  const headers = new Headers();
  // Copia Authorization se existir
  const auth = req.headers.get('Authorization');
  if (auth) headers.set('Authorization', auth);
  // Content-Type do body (json)
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