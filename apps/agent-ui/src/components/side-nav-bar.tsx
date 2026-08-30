'use client';

import { cn } from '@fluxa/ui';
import { Icon } from './icon';
import { initials } from '@/lib/ui';

export type Presence = 'online' | 'away' | 'offline';

/** Itens na ordem/rotulos do protótipo: Fila · Inbox · Métricas · Config. */
const NAV_ITEMS = [
  { id: 'queue', icon: 'format_list_bulleted', label: 'Fila', tip: 'Fila de atendimento' },
  { id: 'inbox', icon: 'inbox', label: 'Inbox', tip: 'Minhas conversas' },
  { id: 'analytics', icon: 'bar_chart', label: 'Métricas', tip: 'Analytics' },
  { id: 'config', icon: 'settings', label: 'Config', tip: 'Configurações' },
] as const;

const presenceDot: Record<Presence, string> = {
  online: 'bg-online',
  away: 'bg-away',
  offline: 'bg-offline',
};

/** Ciclo de presença ao clicar no avatar: online → away → offline → online. */
const cyclePresence: Record<Presence, Presence> = {
  online: 'away',
  away: 'offline',
  offline: 'online',
};

const presenceLabel: Record<Presence, string> = {
  online: 'online',
  away: 'ausente',
  offline: 'offline',
};

/**
 * Rail de ícones do painel do agente (76px, como o protótipo). As views Fila,
 * Inbox, Métricas e Config ficam aqui — a ativa recebe o realce de acento, a
 * Fila expõe o badge de contagem e o avatar mostra/muda o status de presença.
 */
export function SideNavBar({
  active,
  agentName,
  presence,
  queueCount = 0,
  onSelect,
  onPresence,
}: {
  active: string;
  agentName: string;
  presence: Presence;
  queueCount?: number;
  onSelect: (id: string) => void;
  onPresence?: (presence: Presence) => void;
}) {
  return (
    <nav className="z-30 flex w-[76px] shrink-0 flex-col items-center justify-between border-r border-surface-border bg-surface-container-lowest py-5">
      <div className="flex w-full flex-col items-center gap-5">
        <div className="grid h-[38px] w-[38px] place-items-center rounded-[11px] bg-primary">
          <span className="font-headline-sm text-on-primary">F</span>
        </div>
        <div className="flex w-full flex-col gap-1.5 px-2">
          {NAV_ITEMS.map((item) => {
            const isActive = item.id === active;
            const badge = item.id === 'queue' ? queueCount : undefined;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelect(item.id)}
                aria-label={item.label}
                className={cn(
                  'group relative flex w-full flex-col items-center justify-center gap-1 rounded-lg py-2.5 transition-colors',
                  isActive ? 'bg-accent-soft text-primary' : 'text-outline hover:bg-accent-soft hover:text-on-surface',
                )}
              >
                <Icon name={item.icon} className="text-[22px]" />
                <span className={cn('text-[10px] leading-none tracking-[0.02em]', isActive && 'font-semibold text-primary')}>
                  {item.label}
                </span>
                {badge != null && badge > 0 && (
                  <span className="absolute right-3 top-1.5 grid h-4 min-w-4 place-items-center rounded-full bg-primary px-1 font-code-sm text-[10px] font-semibold leading-none text-on-primary">
                    {badge}
                  </span>
                )}
                {/* Tooltip lateral (estilo do protótipo) */}
                <span className="pointer-events-none absolute left-[calc(100%+8px)] top-1/2 -translate-y-1/2 whitespace-nowrap rounded-md bg-primary px-2 py-1 text-[11px] text-on-primary opacity-0 transition-opacity group-hover:opacity-100">
                  {item.tip}
                </span>
              </button>
            );
          })}
        </div>
      </div>
      <button
        type="button"
        onClick={() => onPresence?.(cyclePresence[presence])}
        aria-label={`Status: ${presenceLabel[presence]}`}
        title={presenceLabel[presence]}
        className="group relative grid h-10 w-10 place-items-center rounded-full border border-surface-border bg-surface-container-high text-sm font-semibold text-on-surface transition-colors hover:bg-surface-variant"
      >
        {initials(agentName)}
        <span
          className={cn(
            'absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-surface-container-lowest',
            presenceDot[presence],
          )}
        />
      </button>
    </nav>
  );
}
