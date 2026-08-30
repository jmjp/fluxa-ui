/**
 * Acesso à API do Agent UI pelo painel de chat.
 *
 * O painel executa dentro da página do Agent UI (bundle `.mjs` importado via
 * module federation), então `fetch('/api/...')` bate no proxy Next same-origin
 * que injeta o `auth_token` no core — sem CORS, sem plumbing de token.
 *
 * O core responde sempre no envelope `{data: ...}` (sucesso) ou
 * `{error: {message}}` (falha). Estes helpers desmontam esse envelope e lançam
 * `Error` com a mensagem do core quando algo falha.
 */

export interface ThreadMessage {
  id: string;
  conversation_id: string;
  direction: 'inbound' | 'outbound' | 'system' | string;
  body: string;
  channel: string;
  customer_ref: string;
  agent_id?: string;
  created_at: string;
}

const BASE = '/api';

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const resp = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...init,
  });
  const json = (await resp.json().catch(() => ({}))) as {
    data?: T;
    error?: { message?: string };
  };
  if (!resp.ok) {
    throw new Error(json?.error?.message ?? `request failed (${resp.status})`);
  }
  return json?.data as T;
}

/** Busca a thread (incremental se `since` for passado). */
export function fetchThread(conversationId: string, since?: string): Promise<ThreadMessage[]> {
  const qs = since ? `?since=${encodeURIComponent(since)}` : '';
  return request<ThreadMessage[]>(`/conversations/${conversationId}/messages${qs}`);
}

/**
 * Envia uma mensagem do cliente (inbound real) pelo canal webchat simulado.
 *
 * O core roteia pelo `channel_id` no path (`webchat_sim`) e deduplica a
 * conversa por `(channel, customer_ref)`. Enviamos `channel` apenas quando é a
 * família conhecida da conversa (`config.channel`) — um valor errado criaria
 * OUTRA conversa no core.
 *
 * A resposta é o `ConversationDTO` (a conversa), não a mensagem — o chamador
 * deve recarregar a thread com `fetchThread` para ver a bolha aparecer.
 */
export function sendInbound(opts: {
  customerRef: string;
  text: string;
  channel?: string;
}): Promise<{ id: string }> {
  const body: Record<string, string> = {
    customer_ref: opts.customerRef,
    text: opts.text,
  };
  if (opts.channel) body.channel = opts.channel;
  return request<{ id: string }>(`/channels/webchat_sim/messages`, {
    method: 'POST',
    body: JSON.stringify(body),
  });
}

/** Formata o `created_at` do core como hora local HH:MM. */
export function formatTime(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
}
