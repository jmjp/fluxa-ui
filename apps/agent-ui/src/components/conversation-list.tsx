'use client';
import { cn } from '@fluxa/ui';
import type { Conversation } from '@fluxa/shared';
import { Icon } from './icon';
import { channelMeta, initials, previewLine, relativeTime } from '@/lib/ui';
import { useMounted } from '@/lib/use-mounted';

/** Cor do dot do canal na lista de conversas (estilo do protótipo). */
const channelDot: Record<string, string> = {
  whatsapp: 'bg-primary',
  telegram: 'bg-on-surface-variant',
  webchat: 'bg-outline',
};

export function ConversationList({
  conversations,
  selectedId,
  onSelect,
}: {
  conversations: Conversation[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}) {
  const mounted = useMounted();
  if (!conversations.length) {
    return (
      <div className="grid h-full place-items-center p-8 text-center">
        <div>
          <Icon name="inbox" className="mx-auto h-8 w-8 text-outline" />
          <p className="mt-3 text-[13px] font-medium text-on-surface">Tudo em dia</p>
          <p className="mt-1 text-[12px] text-outline">As novas conversas aparecerão aqui.</p>
        </div>
      </div>
    );
  }

  return (
    <nav aria-label="Conversas" className="scroll-hide flex flex-col gap-1 overflow-y-auto p-2">
      {conversations.map((conversation) => {
        const active = selectedId === conversation.id;
        return (
          <button
            key={conversation.id}
            type="button"
            onClick={() => onSelect(conversation.id)}
            className={cn(
              'flex items-center gap-3 rounded-lg border p-2.5 text-left transition-colors',
              active
                ? 'border-primary/30 bg-accent-soft'
                : 'border-transparent hover:bg-accent-soft',
            )}
          >
            <div className="grid h-9 w-9 shrink-0 place-items-center rounded-[9px] bg-surface-container-high text-[12px] font-bold text-on-surface">
              {initials(conversation.customer_ref)}
            </div>
            <div className="min-w-0 flex-1">
              <div className="truncate text-[13px] font-semibold text-on-surface">{conversation.customer_ref}</div>
              <div className="mt-0.5 truncate text-[12px] text-outline">{previewLine(conversation)}</div>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <span className={cn('h-2 w-2 rounded-full', channelDot[channelMeta(conversation.channel).label.toLowerCase()] ?? 'bg-outline')} />
              <span className={cn('font-code-sm text-[10.5px] whitespace-nowrap', active ? 'font-medium text-primary' : 'text-outline')}>
                {mounted ? relativeTime(conversation.updated_at) : ''}
              </span>
            </div>
          </button>
        );
      })}
    </nav>
  );
}
