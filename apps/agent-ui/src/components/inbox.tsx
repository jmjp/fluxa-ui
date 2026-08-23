'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, Badge, Button, cn } from '@fluxa/ui';
import type { Agent, Conversation } from '@fluxa/shared';

interface InboxProps {
  initialConversations: Conversation[];
  initialAgents: Agent[];
  error: string | null;
}

/**
 * Layout principal do Agent UI (PRD §8.2):
 *  - Esquerda: lista de conversas (estilo inbox do Chatwoot)
 *  - Centro: thread de mensagens + envio
 *  - Direita: painel dinamico do plugin da etapa atual (slot "main")
 *
 * Estado e mutacoes ficam no client; dados iniciais vem via SSR.
 */
export function Inbox({ initialConversations, initialAgents, error }: InboxProps) {
  const [conversations] = useState(initialConversations);
  const [selectedId, setSelectedId] = useState<string | null>(
    initialConversations[0]?.id ?? null,
  );
  const selected = conversations.find((c) => c.id === selectedId);

  return (
    <div className="flex h-screen flex-col">
      <Header agents={initialAgents} />
      {error && (
        <div className="bg-destructive/10 px-4 py-2 text-sm text-destructive">{error}</div>
      )}
      <div className="grid flex-1 grid-cols-[300px_1fr_360px] divide-x overflow-hidden">
        <ConversationList
          conversations={conversations}
          selectedId={selectedId}
          onSelect={setSelectedId}
        />
        <Thread conversation={selected} />
        <StepPluginPanel conversation={selected} />
      </div>
    </div>
  );
}

function Header({ agents }: { agents: Agent[] }) {
  const online = agents.filter((a) => a.status === 'online').length;
  return (
    <header className="flex items-center justify-between border-b px-4 py-3">
      <div>
        <h1 className="text-lg font-semibold">Fluxa</h1>
        <p className="text-xs text-muted-foreground">Painel do atendente</p>
      </div>
      <div className="flex items-center gap-2 text-sm">
        <Badge variant="success">{online} online</Badge>
        <Badge variant="outline">{agents.length} total</Badge>
      </div>
    </header>
  );
}

function ConversationList({
  conversations,
  selectedId,
  onSelect,
}: {
  conversations: Conversation[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}) {
  return (
    <aside className="overflow-y-auto">
      <div className="border-b p-3">
        <h2 className="text-sm font-medium text-muted-foreground">Conversas</h2>
      </div>
      {conversations.length === 0 && (
        <p className="p-4 text-sm text-muted-foreground">Nenhuma conversa no momento.</p>
      )}
      <ul>
        {conversations.map((c) => (
          <li
            key={c.id}
            onClick={() => onSelect(c.id)}
            className={cn(
              'cursor-pointer border-b p-3 transition-colors hover:bg-accent',
              selectedId === c.id && 'bg-accent',
            )}
          >
            <div className="flex items-center justify-between">
              <span className="font-medium">{c.customer_ref}</span>
              <Badge variant={queueStatusVariant(c.queue_status)}>{c.queue_status}</Badge>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              {c.channel} • {new Date(c.created_at).toLocaleString('pt-BR')}
            </p>
          </li>
        ))}
      </ul>
    </aside>
  );
}

function Thread({ conversation }: { conversation: Conversation | undefined }) {
  if (!conversation) {
    return (
      <main className="flex items-center justify-center bg-muted/30">
        <p className="text-sm text-muted-foreground">Selecione uma conversa para abrir.</p>
      </main>
    );
  }
  return (
    <main className="flex flex-col">
      <header className="border-b p-4">
        <h2 className="font-semibold">{conversation.customer_ref}</h2>
        <p className="text-xs text-muted-foreground">
          Conversa {conversation.id} • canal {conversation.channel}
        </p>
      </header>
      <div className="flex-1 overflow-y-auto p-4">
        <p className="text-sm text-muted-foreground">Mensagens serao carregadas via API.</p>
      </div>
      <footer className="border-t p-3">
        <ReplyBox conversationId={conversation.id} />
      </footer>
    </main>
  );
}

function ReplyBox({ conversationId }: { conversationId: string }) {
  return (
    <form
      className="flex gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        // TODO Fase 2: POST /api/v1/conversations/{id}/messages
        // e otimistic update do thread.
      }}
    >
      <input
        type="text"
        placeholder="Responder..."
        className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      />
      <Button type="submit" data-conversation-id={conversationId}>Enviar</Button>
    </form>
  );
}

function StepPluginPanel({ conversation }: { conversation: Conversation | undefined }) {
  // PRD §6.5: o painel direito renderiza os plugins de step da etapa
  // atual, num layout multi-slot. Por enquanto so temos o slot "main";
  // plugins publicam seus bundles via Module Federation (configuracao
  // virá na Fase 2 da UI).
  if (!conversation) {
    return (
      <aside className="overflow-y-auto bg-muted/30 p-4">
        <p className="text-sm text-muted-foreground">Painel do plugin aparecera aqui.</p>
      </aside>
    );
  }
  return (
    <aside className="overflow-y-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Etapa atual</CardTitle>
        </CardHeader>
        <CardContent>
          {conversation.current_step_id ? (
            <p className="text-sm">
              <code className="rounded bg-muted px-1.5 py-0.5">
                {conversation.current_step_id}
              </code>
            </p>
          ) : (
            <p className="text-sm text-muted-foreground">
              Conversa sem etapa ativa (workflow nao publicado).
            </p>
          )}
        </CardContent>
      </Card>
      <p className="mt-4 text-xs text-muted-foreground">
        O bundle do plugin de step sera carregado via Module Federation (Fase 2).
      </p>
    </aside>
  );
}

function queueStatusVariant(status: string): 'default' | 'secondary' | 'success' | 'warning' {
  switch (status) {
    case 'in_progress':
      return 'success';
    case 'assigned':
      return 'default';
    case 'waiting':
      return 'warning';
    default:
      return 'secondary';
  }
}
