'use client';
import { MessageCircle, Send, Smartphone } from 'lucide-react';
import { Avatar, AvatarFallback, Badge, cn } from '@fluxa/ui';
import type { Conversation } from '@fluxa/shared';

const channelIcon = (channel: string) => channel.toLowerCase().includes('whats') ? MessageCircle : channel.toLowerCase().includes('telegram') ? Send : Smartphone;
const statusVariant = (status: Conversation['queue_status']) => status === 'waiting' ? 'warning' : status === 'closed' ? 'destructive' : 'success';
const statusLabel = (status: Conversation['queue_status']) => status === 'in_progress' ? 'ativo' : status === 'assigned' ? 'atribuído' : status === 'closed' ? 'resolvido' : 'aguardando';

export function ConversationList({ conversations, selectedId, onSelect }: { conversations: Conversation[]; selectedId: string | null; onSelect: (id: string) => void }) {
  if (!conversations.length) return <div className="grid h-full place-items-center p-8 text-center"><div><MessageCircle className="mx-auto h-10 w-10 text-muted-foreground/50" /><p className="mt-3 text-sm font-medium">Tudo em dia</p><p className="mt-1 text-xs text-muted-foreground">As novas conversas aparecerão aqui.</p></div></div>;
  return <nav aria-label="Conversas" className="divide-y overflow-y-auto">{conversations.map((conversation) => { const Icon = channelIcon(conversation.channel); const initials = conversation.customer_ref.slice(0, 2).toUpperCase(); return <button key={conversation.id} type="button" onClick={() => onSelect(conversation.id)} className={cn('flex w-full gap-3 p-3 text-left transition-colors hover:bg-sky-50/70', selectedId === conversation.id && 'bg-sky-50 ring-1 ring-inset ring-sky-100')}><Avatar className="h-10 w-10"><AvatarFallback className="bg-gradient-to-br from-sky-500 to-indigo-500 text-xs">{initials}</AvatarFallback></Avatar><span className="min-w-0 flex-1"><span className="flex items-center justify-between gap-2"><span className="truncate text-sm font-semibold">{conversation.customer_ref}</span><Badge variant={statusVariant(conversation.queue_status)} className="shrink-0 text-[10px]">{statusLabel(conversation.queue_status)}</Badge></span><span className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground"><Icon className="h-3 w-3" />{conversation.channel}<span>·</span><span className="truncate">{conversation.current_step_id ?? 'triagem'}</span></span></span></button>; })}</nav>;
}
