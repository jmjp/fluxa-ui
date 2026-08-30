'use client';

import { useMemo, useState } from 'react';
import { cn } from '@fluxa/ui';
import type { Conversation } from '@fluxa/shared';
import { Icon } from './icon';
import { channelMeta, contactLine, initials, priorityChip, priorityFor, stepLabel, stepIcon } from '@/lib/ui';
import { useMounted } from '@/lib/use-mounted';

type ChannelFilter = 'todos' | 'whatsapp' | 'telegram' | 'webchat';

const FILTERS: Array<{ id: ChannelFilter; label: string }> = [
  { id: 'todos', label: 'Todos os canais' },
  { id: 'whatsapp', label: 'WhatsApp' },
  { id: 'telegram', label: 'Telegram' },
  { id: 'webchat', label: 'Webchat' },
];

/** Relógio de espera (MM:SS) + flag "hot" quando passa de 5 minutos. */
function waitMeta(iso?: string): { text: string; hot: boolean } {
  if (!iso) return { text: '—', hot: false };
  const t = new Date(iso).getTime();
  if (Number.isNaN(t)) return { text: '—', hot: false };
  const secs = Math.max(0, Math.floor((Date.now() - t) / 1000));
  const p = (n: number) => String(n).padStart(2, '0');
  return { text: `${p(Math.floor(secs / 60))}:${p(secs % 60)}`, hot: secs >= 300 };
}

export function QueueView({
  conversations,
  onPick,
  notice,
}: {
  conversations: Conversation[];
  onPick: (id: string) => void;
  notice?: string | null;
}) {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<ChannelFilter>('todos');
  const mounted = useMounted();

  const waiting = useMemo(
    () => conversations.filter((item) => item.queue_status === 'waiting'),
    [conversations],
  );
  const activeCount = conversations.filter((item) => item.queue_status === 'assigned' || item.queue_status === 'in_progress').length;

  const queued = useMemo(() => {
    const q = query.trim().toLowerCase();
    return waiting
      .filter((item) => filter === 'todos' || item.channel.toLowerCase() === filter)
      .filter((item) => {
        if (!q) return true;
        return (
          item.customer_ref.toLowerCase().includes(q) ||
          stepLabel(item.current_step_id).toLowerCase().includes(q) ||
          channelMeta(item.channel).label.toLowerCase().includes(q)
        );
      })
      .sort((a, b) => {
        const w = { P1: 0, P2: 1, P3: 2 } as const;
        return w[priorityFor(a)] - w[priorityFor(b)] || new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      });
  }, [waiting, query, filter]);

  return (
    <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
      {notice && (
        <div className="flex items-center gap-2 border-b border-error/30 bg-error/10 px-7 py-2 text-sm text-error">
          <Icon name="error_outline" className="text-[18px]" />
          {notice}
        </div>
      )}

      {/* Topbar */}
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-surface-border bg-surface-container-lowest px-7 py-4">
        <div>
          <div className="font-headline-md text-[19px] font-bold tracking-tight text-on-surface">Fluxa</div>
          <h2 className="mt-0.5 text-[15px] font-semibold tracking-tight text-on-surface">Fila de atendimento</h2>
          <p className="mt-0.5 text-[12.5px] text-outline">Omni-channel em tempo real — priorize a próxima conversa.</p>
        </div>
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-outline">
              <Icon name="search" className="text-[16px]" />
            </span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="w-64 rounded-lg border border-surface-border bg-surface-container-lowest py-2 pl-9 pr-3 text-[13px] text-on-surface transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-accent-soft"
              placeholder="Buscar na fila…"
              type="text"
            />
          </div>
          <button className="inline-flex items-center gap-1.5 rounded-lg border border-surface-border bg-transparent px-3 py-2 text-[12px] font-medium text-on-surface transition-colors hover:border-primary">
            <Icon name="filter_list" className="text-[16px]" />
            Filtros
          </button>
          <button className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3.5 py-2 text-[13px] font-medium text-on-primary transition-colors hover:bg-primary-container">
            Novo broadcast
          </button>
        </div>
      </header>

      {/* KPIs */}
      <div className="grid grid-cols-2 gap-3.5 px-7 pt-5 md:grid-cols-4">
        <div className="flex flex-col gap-1 rounded-xl border border-surface-border bg-surface-container-lowest px-4 py-4">
          <span className="text-[12px] text-outline">Na fila agora</span>
          <span className="font-headline-md text-[26px] font-bold leading-none tracking-tight tabular-nums text-on-surface">{waiting.length}</span>
          <span className="font-code-sm text-[11px] text-outline">aguardando atendente</span>
        </div>
        <div className="flex flex-col gap-1 rounded-xl border border-surface-border bg-surface-container-lowest px-4 py-4">
          <span className="text-[12px] text-outline">Em atendimento</span>
          <span className="font-headline-md text-[26px] font-bold leading-none tracking-tight tabular-nums text-on-surface">{activeCount}</span>
          <span className="font-code-sm text-[11px] text-outline">agentes logados</span>
        </div>
        <div className="flex flex-col gap-1 rounded-xl border border-surface-border bg-surface-container-lowest px-4 py-4">
          <span className="text-[12px] text-outline">Tempo médio de espera</span>
          <span className="font-headline-md text-[26px] font-bold leading-none tracking-tight tabular-nums text-on-surface">2:34</span>
          <span className="font-code-sm text-[11px] text-outline">minutos nas últimas 24h</span>
        </div>
        <div className="flex flex-col gap-1 rounded-xl border border-primary bg-primary px-4 py-4 text-on-primary">
          <span className="text-[12px] text-on-primary/70">SLA hoje</span>
          <span className="font-headline-md text-[26px] font-bold leading-none tracking-tight tabular-nums">96%</span>
          <span className="font-code-sm text-[11px] text-on-primary/70">respondidas &lt; 60s</span>
        </div>
      </div>

      {/* Corpo */}
      <div className="custom-scrollbar flex-1 overflow-auto px-7 py-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilter(f.id)}
                className={cn(
                  'rounded-lg px-3 py-1.5 text-[12.5px] transition-colors',
                  filter === f.id
                    ? 'border border-surface-border bg-transparent text-on-surface'
                    : 'border border-transparent text-outline hover:bg-accent-soft hover:text-on-surface',
                )}
              >
                {f.label}
              </button>
            ))}
          </div>
          <span className="font-code-sm text-[11px] text-outline">{queued.length} conversa(s) na fila</span>
        </div>

        <div className="overflow-hidden rounded-xl border border-surface-border bg-surface-container-lowest">
          {/* Cabeçalho da tabela */}
          <div
            className="grid gap-3.5 border-b border-surface-border bg-surface-container-low px-[18px] py-3 font-code-sm text-[10.5px] uppercase tracking-[0.05em] text-outline"
            style={{ gridTemplateColumns: '2.1fr 1.3fr 1.1fr 1.2fr 0.8fr 1.1fr' }}
          >
            <span>Cliente</span>
            <span>Canal</span>
            <span>Espera</span>
            <span>Etapa</span>
            <span>Prioridade</span>
            <span className="text-right">Ação</span>
          </div>

          {queued.length === 0 ? (
            <div className="grid place-items-center px-6 py-14 text-center text-outline">
              <Icon name="inbox" className="mb-2.5 text-[28px]" />
              <p className="text-[13px] text-on-surface">Nenhuma conversa em espera.</p>
              <p className="mt-1 text-[12px]">As conversas que aguardam atendente aparecerão aqui.</p>
            </div>
          ) : (
            queued.map((item) => {
              const channel = channelMeta(item.channel);
              const priority = priorityFor(item);
              const wait = mounted ? waitMeta(item.created_at) : { text: '—', hot: false };
              return (
                <div
                  key={item.id}
                  className="grid items-center gap-3.5 border-b border-surface-border px-[18px] py-4 transition-colors last:border-b-0 hover:bg-accent-soft"
                  style={{ gridTemplateColumns: '2.1fr 1.3fr 1.1fr 1.2fr 0.8fr 1.1fr' }}
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="grid h-9 w-9 shrink-0 place-items-center rounded-[9px] bg-surface-container-high text-[12px] font-bold text-on-surface">
                      {initials(item.customer_ref)}
                    </div>
                    <div className="min-w-0">
                      <div className="truncate text-[13.5px] font-semibold text-on-surface">{item.customer_ref}</div>
                      <div className="truncate font-code-sm text-[11px] text-outline">{contactLine(item) || item.channel_instance_id}</div>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-surface-border px-2.5 py-1 text-[11.5px] text-on-surface">
                      <Icon name={channel.icon} className="text-[15px]" />
                      {channel.label}
                    </span>
                  </div>
                  <div className="hidden md:block">
                    <span
                      className={cn(
                        'inline-flex items-center gap-1.5 font-code-sm text-[12.5px] tabular-nums',
                        wait.hot ? 'font-semibold text-primary' : 'text-outline',
                      )}
                    >
                      <Icon name={wait.hot ? 'timer' : 'schedule'} className="text-[14px]" />
                      {wait.text}
                    </span>
                  </div>
                  <div className="hidden md:block">
                    <span className="inline-flex items-center gap-1.5 text-[12.5px] text-outline">
                      <Icon name={stepIcon(item.current_step_id)} className="text-[14px]" />
                      {stepLabel(item.current_step_id)}
                    </span>
                  </div>
                  <div>
                    <span className={cn('inline-grid min-w-[30px] place-items-center rounded-md px-1.5 py-0.5 font-code-sm text-[11px] font-bold', priorityChip(priority))}>
                      {priority}
                    </span>
                  </div>
                  <div className="text-right">
                    <button
                      type="button"
                      onClick={() => onPick(item.id)}
                      className="inline-flex items-center rounded-lg bg-primary px-3 py-1.5 text-[12px] font-medium text-on-primary transition-colors hover:bg-primary-container"
                    >
                      Pegar conversa
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
