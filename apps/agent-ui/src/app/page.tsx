import { createClient } from '@fluxa/shared/api';
import { Inbox } from '@/components/inbox';
import type { Agent, Conversation } from '@fluxa/shared';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const apiURL = process.env.NEXT_PUBLIC_FLUXA_API_URL;
  if (!apiURL) {
    console.error('FATAL: NEXT_PUBLIC_FLUXA_API_URL não setada; Agent UI vai falhar no SSR.');
  }

  const finalURL = apiURL ?? 'http://127.0.0.1:8080';
  const client = createClient(finalURL);

  // SSR inicial: lista conversas + agentes (pra montar a UI).
  // Erros viram UI degradada (PRD §11: "degradação graciosa esperada").
  let conversations: Conversation[] = [];
  let agents: Agent[] = [];
  let error: string | null = null;
  try {
    [conversations, agents] = await Promise.all([
      client.listConversations(),
      client.listAgents(),
    ]);
  } catch (e) {
    error = e instanceof Error ? e.message : 'falha ao carregar dados iniciais';
  }

  return <Inbox initialConversations={conversations} initialAgents={agents} error={error} />;
}
