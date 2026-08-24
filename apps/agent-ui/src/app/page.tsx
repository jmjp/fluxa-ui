import { cookies, headers } from 'next/headers';
import { ErrorBoundary } from '@/components/error-boundary';
import { Inbox } from '@/components/inbox';
import type { Agent, Conversation } from '@fluxa/shared';

/**
 * SSR da HomePage do Agent UI.
 *
 * Bate nos proxies locais em /api/{conversations,agents}/[...path]
 * em vez de chamar o core direto. Os proxies vivem em
 * apps/agent-ui/src/app/api/{conversations,agents,workflows}/[...path]/route.ts
 * e reenviam o cookie `auth_token` como Authorization: Bearer pro core,
 * evitando expor a URL do core no client e mantendo CORS consistente.
 *
 * Envelope da API do core: { data?: T; error?: { message, code } }.
 */
interface APIEnvelope<T> {
  data?: T;
  error?: { message: string; code?: string };
}

export const dynamic = 'force-dynamic';

/**
 * Constroi a URL absoluta do proprio Next a partir dos headers
 * injetados pelo Next (x-forwarded-proto, host). Necessario porque
 * SSR fetch precisa de URL absoluta.
 */
function absoluteBase(headersList: Awaited<ReturnType<typeof headers>>): string {
  const host = headersList.get('host') ?? 'localhost:9090';
  const proto = headersList.get('x-forwarded-proto') ?? 'http';
  return `${proto}://${host}`;
}

async function proxyFetch<T>(
  baseURL: string,
  path: string,
  cookieHeader: string,
): Promise<T> {
  const resp = await fetch(`${baseURL}/api/${path}`, {
    headers: {
      // O proxy le o token do cookie (igual ao middleware), entao
      // precisamos repassar o cookie na chamada interna. Sem isso o
      // proxy responde 401 mesmo quando o usuario esta logado.
      Cookie: cookieHeader,
    },
    cache: 'no-store',
  });
  const text = await resp.text();
  let parsed: APIEnvelope<T> = {};
  try {
    parsed = text ? JSON.parse(text) : {};
  } catch {
    throw new Error(`invalid JSON from ${baseURL}/api/${path}`);
  }
  if (!resp.ok || parsed.error) {
    throw new Error(parsed.error?.message ?? `HTTP ${resp.status} from ${baseURL}/api/${path}`);
  }
  return parsed.data as T;
}

export default async function HomePage() {
  const cookieStore = await cookies();
  const rawToken = cookieStore.get('auth_token')?.value;
  const token = rawToken ? decodeURIComponent(rawToken) : null;
  const cookieHeader = rawToken ? `auth_token=${rawToken}` : '';

  const headersList = await headers();
  const baseURL = absoluteBase(headersList);

  let conversations: Conversation[] = [];
  let agents: Agent[] = [];
  let error: string | null = null;

  if (!token) {
    error = 'sessao nao encontrada; faca login para ver conversas';
  } else {
    try {
      [conversations, agents] = await Promise.all([
        proxyFetch<Conversation[]>(baseURL, 'conversations', cookieHeader),
        proxyFetch<Agent[]>(baseURL, 'agents', cookieHeader),
      ]);
    } catch (e) {
      error = e instanceof Error ? e.message : 'falha ao carregar dados iniciais';
    }
  }

  return (
    <ErrorBoundary>
      <Inbox initialConversations={conversations} initialAgents={agents} error={error} />
    </ErrorBoundary>
  );
}