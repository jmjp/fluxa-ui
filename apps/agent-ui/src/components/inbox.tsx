'use client';

import { useCallback, useEffect, useRef, useState, type FormEvent } from 'react';
import { cn, Dialog, DialogContent, DialogTitle } from '@fluxa/ui';
import type { Agent, Conversation, WorkflowStep } from '@fluxa/shared';
import { ConversationList } from './conversation-list';
import { ContextPanel } from './context-panel';
import { AnalyticsView } from './analytics-view';
import { ConfigView } from './config-view';
import { QueueView } from './queue-view';
import { SideNavBar, type Presence } from './side-nav-bar';
import { WorkflowBreadcrumb } from './workflow-breadcrumb';
import { Icon } from './icon';
import { WORKFLOW_STEPS, channelMeta, contactLine, initials } from '@/lib/ui';
import { getToken } from '@/lib/auth';
import { useMounted } from '@/lib/use-mounted';
import { PLUGIN_CAPABILITIES } from '@/lib/plugin-capabilities';

interface InboxProps {
  initialConversations: Conversation[];
  initialAgents: Agent[];
  error: string | null;
}

type View = 'queue' | 'inbox' | 'analytics' | 'config';

const workflowSteps: WorkflowStep[] = WORKFLOW_STEPS.map(({ id }) => ({ id, name: id, transitions: [] }));

/**
 * Mensagem da thread, no shape devolvido por
 * `GET /api/v1/conversations/{id}/messages` (via proxy do Next).
 */
interface ThreadMessage {
  id: string;
  conversation_id: string;
  direction: 'inbound' | 'outbound' | 'system';
  body: string;
  agent_id?: string;
  created_at: string;
}

function messageTime(iso: string): string {
  const t = new Date(iso);
  return Number.isNaN(t.getTime()) ? '' : t.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
}

export function Inbox({ initialConversations, initialAgents, error }: InboxProps) {
  const [view, setView] = useState<View>('queue');
  const [conversations, setConversations] = useState(initialConversations);
  const [selectedId, setSelectedId] = useState(initialConversations[0]?.id ?? null);
  const [composer, setComposer] = useState('');
  const [presence, setPresence] = useState<Presence>('online');
  const [mobileListOpen, setMobileListOpen] = useState(false);
  const [mobileContextOpen, setMobileContextOpen] = useState(false);
  const [thread, setThread] = useState<ThreadMessage[]>([]);
  const [threadLoading, setThreadLoading] = useState(false);
  const [threadError, setThreadError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [agentId, setAgentId] = useState<string | null>(null);
  const [picking, setPicking] = useState(false);
  const [pickError, setPickError] = useState<string | null>(null);
  const mounted = useMounted();
  const selected = conversations.find((item) => item.id === selectedId);
  // "Minhas Conversas": apenas as atribuídas ao agente logado.
  // A Fila continua com todas as waiting (o filtro é só da lista do inbox).
  const myConversations = agentId ? conversations.filter((c) => c.assigned_agent_id === agentId) : [];
  const agentName = initialAgents[0]?.name ?? 'Fluxa Agent';

  // Resolve o agente atual (quem enviará as mensagens como atendente).
  useEffect(() => {
    const token = getToken();
    if (!token) return;
    let cancelled = false;
    fetch('/api/auth/me', { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => (r.ok ? r.json() : null))
      .then((result) => {
        if (!cancelled) setAgentId(result?.data?.id ?? null);
      })
      .catch(() => {});
    return () => { cancelled = true; };
  }, []);

  // Seleção inicial: garante que a conversa aberta pertence ao agente (a
  // default pode apontar para outra; o filtro de "Minhas Conversas" esconderia).
  useEffect(() => {
    if (!agentId) return;
    setSelectedId((current) => {
      const mine = initialConversations.filter((c) => c.assigned_agent_id === agentId);
      if (mine.length > 0 && !mine.some((c) => c.id === current)) return mine[0]?.id ?? current;
      return current;
    });
  }, [agentId, initialConversations]);

  // Mescla a thread por `id` (dedup de corrida entre `send`, poll e reload).
  const selectedIdRef = useRef(selectedId);
  selectedIdRef.current = selectedId;
  const mergeThread = useCallback((incoming: ThreadMessage[]) => {
    setThread((prev) => {
      const map = new Map<string, ThreadMessage>();
      for (const m of prev) map.set(m.id, m);
      for (const m of incoming) map.set(m.id, m);
      return [...map.values()].sort(
        (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
      );
    });
  }, []);

  // Carrega a thread. `silent` = refetch de fundo (poll), que não alterna o
  // estado de loading nem surface erro momentâneo — a thread nunca é limpa.
  const loadThread = useCallback(
    async (opts?: { silent?: boolean }) => {
      const id = selectedId;
      if (!id) return;
      if (!opts?.silent) setThreadLoading(true);
      try {
        const r = await fetch(`/api/conversations/${id}/messages`);
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        const result = await r.json();
        if (selectedIdRef.current !== id) return; // resposta de conversa antiga
        const data = (result?.data ?? []) as ThreadMessage[];
        mergeThread(Array.isArray(data) ? data : []);
        setThreadError(null);
      } catch (e) {
        if (selectedIdRef.current !== id) return;
        if (!opts?.silent) setThreadError(e instanceof Error ? e.message : 'Falha ao carregar mensagens');
      } finally {
        if (selectedIdRef.current === id && !opts?.silent) setThreadLoading(false);
      }
    },
    [selectedId, mergeThread],
  );

  // Carrega a thread ao selecionar conversa e mantém a sync ao vivo (~3s) para
  // refletir o que o "cliente" digita no painel de chat sem recarregar a página.
  useEffect(() => {
    if (!selectedId) { setThread([]); setThreadError(null); return; }
    setThread([]);
    void loadThread();
    const poll = window.setInterval(() => void loadThread({ silent: true }), 3000);
    return () => window.clearInterval(poll);
  }, [selectedId, loadThread]);

  const transition = (toStepId: string) =>
    selected &&
    setConversations((items) =>
      items.map((item) => (item.id === selected.id ? { ...item, current_step_id: toStepId } : item)),
    );
  const send = async (event: FormEvent) => {
    event.preventDefault();
    const text = composer.trim();
    if (!text || !selected || sending) return;
    if (!agentId) { setThreadError('Sessão de atendente indisponível para enviar mensagem.'); return; }
    setSending(true);
    setThreadError(null);
    try {
      const r = await fetch(`/api/conversations/${selected.id}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ agent_id: agentId, text }),
      });
      const result = await r.json().catch(() => ({}));
      if (!r.ok || result.error) throw new Error(result.error?.message ?? `HTTP ${r.status}`);
      const msg = result.data as ThreadMessage;
      setThread((prev) => [...prev, msg]);
      setComposer('');
      // Ao responder, a conversa passa a "Em atendimento".
      setConversations((items) => items.map((c) => (c.id === selected.id ? { ...c, queue_status: 'in_progress' } : c)));
    } catch (e) {
      setThreadError(e instanceof Error ? e.message : 'Falha ao enviar mensagem.');
    } finally {
      setSending(false);
    }
  };
  const pick = async (id: string) => {
    if (picking) return;
    if (!agentId) { setPickError('Sessão de atendente indisponível para pegar conversa.'); return; }
    setPicking(true);
    setPickError(null);
    try {
      const r = await fetch(`/api/conversations/${id}/pickup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ agent_id: agentId }),
      });
      const result = await r.json().catch(() => ({}));
      if (!r.ok || result.error) throw new Error(result.error?.message ?? `HTTP ${r.status}`);
      const conv = result.data as Conversation;
      setConversations((items) =>
        items.map((c) => (c.id === conv.id ? { ...c, queue_status: conv.queue_status, assigned_agent_id: conv.assigned_agent_id } : c)),
      );
      setSelectedId(conv.id);
      setView('inbox');
    } catch (e) {
      setPickError(e instanceof Error ? e.message : 'Falha ao pegar conversa.');
    } finally {
      setPicking(false);
    }
  };

  // Ações locais de Resolver/Transferir (espelham o comportamento do protótipo,
  // atualizando o estado local; sem endpoint dedicado definido no core).
  const resolve = () => {
    if (!selected) return;
    setConversations((items) => items.map((c) => (c.id === selected.id ? { ...c, queue_status: 'closed', current_step_id: 'avaliação' } : c)));
    setSelectedId(null);
  };
  const transfer = () => {
    if (!selected) return;
    setConversations((items) =>
      items.map((c) => (c.id === selected.id ? { ...c, queue_status: 'waiting', assigned_agent_id: undefined, current_step_id: 'triagem' } : c)),
    );
    setSelectedId(null);
  };

  const navigate = (id: string) => {
    if (id === 'queue' || id === 'inbox' || id === 'analytics' || id === 'config') {
      if (id === 'inbox' && !selected && myConversations.length) setSelectedId(myConversations[0]!.id);
      setView(id);
    }
  };

  return (
    <div className="flex h-dvh overflow-hidden bg-background text-on-surface">
      <SideNavBar
        active={view}
        agentName={agentName}
        presence={presence}
        queueCount={conversations.filter((item) => item.queue_status === 'waiting').length}
        onSelect={navigate}
        onPresence={setPresence}
      />

      {view === 'queue' && <QueueView conversations={conversations} onPick={pick} notice={pickError} />}
      {view === 'analytics' && <AnalyticsView />}
      {view === 'config' && <ConfigView />}

      {view === 'inbox' && (
        <div className="flex min-w-0 flex-1 overflow-hidden">
          {/* Conversation list (300px) */}
          <aside className="flex w-[300px] shrink-0 flex-col border-r border-surface-border bg-surface-container-lowest">
            <div className="border-b border-surface-border px-4 pb-3 pt-4">
              <h2 className="mb-3 text-[15px] font-semibold text-on-surface">Minhas conversas</h2>
              <div className="relative">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-outline">
                  <Icon name="search" className="text-[16px]" />
                </span>
                <input
                  className="w-full rounded-lg border border-surface-border bg-surface-container-lowest py-2 pl-9 pr-3 text-[13px] text-on-surface focus:border-primary focus:outline-none focus:ring-2 focus:ring-accent-soft"
                  placeholder="Buscar conversas…"
                  type="text"
                />
              </div>
            </div>
            <ConversationList conversations={myConversations} selectedId={selectedId} onSelect={setSelectedId} />
          </aside>

          {/* Chat column */}
          <div className="flex min-w-0 flex-1 flex-col bg-background">
            <header className="border-b border-surface-border bg-surface-container-lowest px-6 py-3.5">
              <div className="flex items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <button
                    type="button"
                    className="-ml-2 lg:hidden"
                    onClick={() => setMobileListOpen(true)}
                    aria-label="Voltar às conversas"
                  >
                    <Icon name="arrow_back" className="text-on-surface-variant" />
                  </button>
                  {selected ? (
                    <>
                      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-surface-container-high text-[12px] font-bold text-on-surface">
                        {initials(selected.customer_ref)}
                      </div>
                      <div className="min-w-0">
                        <div className="truncate text-[17px] font-bold tracking-tight text-on-surface">{selected.customer_ref}</div>
                        <div className="truncate font-code-sm text-[11px] text-outline">
                          {channelMeta(selected.channel).label} · {contactLine(selected) || selected.channel_instance_id}
                        </div>
                      </div>
                    </>
                  ) : (
                    <h1 className="text-[17px] font-bold tracking-tight text-on-surface">Atendimento</h1>
                  )}
                </div>
                <div className="flex items-center gap-1.5">
                  <button type="button" onClick={transfer} className="rounded-lg border border-surface-border px-3 py-1.5 text-[12px] font-medium text-on-surface transition-colors hover:border-primary">
                    Transferir
                  </button>
                  <button type="button" onClick={resolve} className="rounded-lg bg-primary px-3 py-1.5 text-[12px] font-medium text-on-primary transition-colors hover:bg-primary-container">
                    Resolver
                  </button>
                  <button
                    type="button"
                    className="rounded-lg p-2 text-on-surface-variant transition-colors hover:bg-surface-container-high lg:hidden"
                    onClick={() => setMobileContextOpen(true)}
                    aria-label="Ver detalhes"
                  >
                    <Icon name="info" />
                  </button>
                </div>
              </div>
              {selected && (
                <div className="mt-3 flex items-center gap-2 overflow-x-auto scroll-hide">
                  <WorkflowBreadcrumb currentStepId={selected.current_step_id} />
                </div>
              )}
            </header>

            {/* Thread */}
            <section className="flex flex-1 flex-col overflow-hidden">
              <div className="custom-scrollbar flex flex-1 flex-col gap-3.5 overflow-y-auto px-6 py-5">
                <div className="self-center rounded-full border border-surface-border bg-surface-container-lowest px-3 py-1 font-code-sm text-[11px] text-outline">
                  Hoje, {mounted ? new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) : '--:--'}
                </div>
                {!selected ? (
                  <p className="mx-auto text-[13px] text-on-surface-variant">Selecione uma conversa para começar.</p>
                ) : threadLoading ? (
                  <p className="mx-auto text-[13px] text-on-surface-variant">Carregando mensagens…</p>
                ) : threadError ? (
                  <p className="mx-auto text-[13px] text-error">Não foi possível carregar a conversa: {threadError}</p>
                ) : thread.length === 0 ? (
                  <p className="mx-auto text-[13px] text-on-surface-variant">Nenhuma mensagem nesta conversa ainda.</p>
                ) : (
                  thread.map((message) => {
                    const fromAgent = message.direction === 'outbound';
                    return (
                      <div key={message.id} className={cn('flex max-w-[68%]', fromAgent ? 'self-end' : 'self-start')}>
                        <div
                          className={cn(
                            'px-3.5 py-2.5 text-[13.5px] leading-relaxed',
                            fromAgent
                              ? 'rounded-xl rounded-tr-[4px] bg-primary text-on-primary'
                              : 'rounded-xl rounded-tl-[4px] border border-surface-border bg-surface-container-lowest text-on-surface',
                          )}
                        >
                          <p>{message.body}</p>
                          <span className={cn('mt-1 block font-code-sm text-[10.5px]', fromAgent ? 'text-on-primary/70' : 'text-outline')}>
                            {messageTime(message.created_at)}
                          </span>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              <form onSubmit={send} className="border-t border-surface-border bg-surface-container-lowest px-6 pb-[18px] pt-3.5">
                <div className="flex items-end gap-2.5 rounded-xl border border-surface-border bg-surface-container-lowest px-3.5 py-2 transition-all focus-within:border-primary focus-within:ring-2 focus-within:ring-accent-soft">
                  <button type="button" className="p-1.5 text-outline transition-colors hover:text-primary" aria-label="Anexar arquivo">
                    <Icon name="attach_file" />
                  </button>
                  <textarea
                    rows={1}
                    value={composer}
                    onChange={(event) => setComposer(event.target.value)}
                    placeholder="Digite sua resposta…"
                    aria-label="Digite sua resposta"
                    className="max-h-[120px] w-full resize-none border-none bg-transparent py-1.5 text-[13.5px] leading-snug scroll-hide focus:ring-0"
                    style={{ minHeight: '28px' }}
                  />
                  <button type="submit" disabled={sending} className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary text-on-primary transition-colors hover:bg-primary-container disabled:opacity-40" aria-label="Enviar mensagem">
                    <Icon name="send" />
                  </button>
                </div>
              </form>
            </section>
          </div>

          {/* Context panel (340px) */}
          <aside className="hidden w-[340px] shrink-0 border-l border-surface-border lg:block">
            {selected ? (
              <ContextPanel
                conversation={selected}
                currentStep={workflowSteps.find((step) => step.id === selected.current_step_id) ?? workflowSteps[0]!}
                capabilities={PLUGIN_CAPABILITIES}
                onTransition={transition}
              />
            ) : (
              <div className="grid h-full place-items-center text-[13px] text-outline">Selecione uma conversa.</div>
            )}
          </aside>
        </div>
      )}

      {/* Mobile overlays */}
      <Dialog open={mobileListOpen} onOpenChange={setMobileListOpen}>
        <DialogContent className="bottom-0 left-0 top-auto h-[82dvh] w-full max-w-none translate-x-0 translate-y-0 rounded-b-none p-0">
          <DialogTitle className="border-b px-5 py-4 text-base">Conversas</DialogTitle>
          <ConversationList conversations={myConversations} selectedId={selectedId} onSelect={(id) => { setSelectedId(id); setMobileListOpen(false); }} />
        </DialogContent>
      </Dialog>
      {selected && (
        <Dialog open={mobileContextOpen} onOpenChange={setMobileContextOpen}>
          <DialogContent className="bottom-0 left-0 top-auto max-h-[80dvh] w-full max-w-none translate-x-0 translate-y-0 overflow-y-auto rounded-b-none p-0">
            <DialogTitle className="border-b px-5 py-4 text-base">Contexto da conversa</DialogTitle>
            <ContextPanel
              conversation={selected}
              currentStep={workflowSteps.find((step) => step.id === selected.current_step_id) ?? workflowSteps[0]!}
              capabilities={PLUGIN_CAPABILITIES}
              onTransition={transition}
              showHeader={false}
            />
          </DialogContent>
        </Dialog>
      )}

      {error && <div className="pointer-events-none absolute right-[352px] top-16 z-30 max-w-sm rounded-lg border border-error/30 bg-error/10 p-3 text-sm text-error">Não foi possível atualizar todos os dados: {error}</div>}
    </div>
  );
}
