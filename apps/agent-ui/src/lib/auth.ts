import type { Agent } from '@fluxa/shared';

const TOKEN_COOKIE = 'auth_token';

export interface AuthAgent extends Agent {
  email?: string;
}

interface AuthResponse {
  data?: { token: string; agent: AuthAgent };
  token?: string;
  agent?: AuthAgent;
  error?: { message?: string };
}

function apiURL() {
  return (process.env.NEXT_PUBLIC_FLUXA_API_URL ?? 'http://127.0.0.1:8080').replace(/\/$/, '');
}

export function persistToken(token: string) {
  localStorage.setItem(TOKEN_COOKIE, token);
  document.cookie = `${TOKEN_COOKIE}=${encodeURIComponent(token)}; path=/; max-age=${60 * 60 * 24 * 7}; samesite=lax${location.protocol === 'https:' ? '; secure' : ''}`;
}

export function clearToken() {
  localStorage.removeItem(TOKEN_COOKIE);
  document.cookie = `${TOKEN_COOKIE}=; path=/; max-age=0; samesite=lax`;
}

export function getToken() {
  return typeof window === 'undefined' ? null : localStorage.getItem(TOKEN_COOKIE);
}

export async function authRequest(path: 'login' | 'register', body: Record<string, string>) {
  const response = await fetch(`${apiURL()}/api/v1/auth/${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const result = (await response.json().catch(() => ({}))) as AuthResponse;
  if (!response.ok || result.error) throw new Error(result.error?.message ?? 'Não foi possível concluir a autenticação.');
  const payload = result.data ?? result;
  if (!payload.token || !payload.agent) throw new Error('Resposta de autenticação inválida.');
  persistToken(payload.token);
  return payload.agent;
}

export async function getCurrentAgent(token: string) {
  const response = await fetch(`${apiURL()}/api/v1/auth/me`, { headers: { Authorization: `Bearer ${token}` } });
  if (!response.ok) throw new Error('Sessão expirada.');
  const result = (await response.json()) as { data?: { agent: AuthAgent }; agent?: AuthAgent };
  return result.data?.agent ?? result.agent ?? null;
}
