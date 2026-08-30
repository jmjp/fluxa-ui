import type { Conversation, QueueStatus } from '@fluxa/shared';

/** Steps do workflow (mesma ordem usada no breadcrumb e na tabela). */
export const WORKFLOW_STEPS = [
  { id: 'triagem', label: 'Triagem', icon: 'check_circle' },
  { id: 'cartoes', label: 'Cartões', icon: 'credit_card' },
  { id: 'fatura', label: 'Fatura', icon: 'receipt_long' },
  { id: 'avaliação', label: 'Avaliação', icon: 'star' },
] as const;

export function stepLabel(id?: string): string {
  return WORKFLOW_STEPS.find((step) => step.id === id)?.label ?? id ?? 'Triagem';
}

export function stepIcon(id?: string): string {
  return WORKFLOW_STEPS.find((step) => step.id === id)?.icon ?? 'check_circle';
}

export function stepName(id?: string): string {
  // Nome amigável para exibição na tabela / listas.
  return WORKFLOW_STEPS.find((step) => step.id === id)?.label ?? id ?? 'Triagem';
}

interface ChannelMeta {
  icon: string;
  label: string;
  /** classes do badge: cor do ícone + fundo. */
  chip: string;
  /** cor do ícone (para o dot/avatar). */
  color: string;
  /** fundo do dot redondo sobre o avatar. */
  dot: string;
}

export function channelMeta(channel: string): ChannelMeta {
  const c = channel.toLowerCase();
  if (c.includes('whats')) return { icon: 'chat', label: 'WhatsApp', chip: 'text-whatsapp bg-whatsapp/10', color: 'text-whatsapp', dot: 'bg-whatsapp' };
  if (c.includes('telegram')) return { icon: 'send', label: 'Telegram', chip: 'text-webchat bg-webchat/10', color: 'text-webchat', dot: 'bg-webchat' };
  return { icon: 'forum', label: 'Webchat', chip: 'text-webchat bg-webchat/10', color: 'text-webchat', dot: 'bg-webchat' };
}

export function initials(name: string): string {
  return (name.trim() || '?').slice(0, 2).toUpperCase();
}

interface QueueStatusMeta {
  label: string;
  chip: string;
}

export function queueStatusMeta(status: QueueStatus): QueueStatusMeta {
  switch (status) {
    case 'closed':
      return { label: 'Concluído', chip: 'bg-success/10 text-success' };
    case 'assigned':
      return { label: 'Atribuído', chip: 'bg-webchat/10 text-webchat' };
    case 'in_progress':
      return { label: 'Em atendimento', chip: 'bg-primary/10 text-primary' };
    default:
      return { label: 'Aguardando', chip: 'bg-warning/10 text-warning' };
  }
}

/** Tempo de espera formatado a partir de um timestamp ISO. */
export function waitLabel(iso?: string): string {
  if (!iso) return '—';
  const started = new Date(iso).getTime();
  if (Number.isNaN(started)) return '—';
  const mins = Math.max(0, Math.floor((Date.now() - started) / 60000));
  const secs = Math.max(0, Math.floor((Date.now() - started) / 1000) % 60);
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')} min`;
}

/** Tempo relativo curto para as listas (Agora / 12:04 / Ontem / dd/mm). */
export function relativeTime(iso?: string): string {
  if (!iso) return '';
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return '';
  const now = Date.now();
  const diff = now - then;
  if (diff < 60_000) return 'Agora';
  if (diff < 60 * 60_000) return `${Math.floor(diff / 60_000)} min atrás`;
  const date = new Date(then);
  const today = new Date(now);
  const yesterday = new Date(now - 86_400_000);
  if (date.toDateString() === today.toDateString()) {
    return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  }
  if (date.toDateString() === yesterday.toDateString()) return 'Ontem';
  return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
}

/** Prioridade determinística (P1..P3) derivada do id da conversa. */
export function priorityFor(conversation: Conversation): 'P1' | 'P2' | 'P3' {
  const hash = [...conversation.id].reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  return (['P1', 'P2', 'P3'] as const)[hash % 3]!;
}

export function priorityChip(priority: string): string {
  // P1 = filled (preenchida), P2 = mid (suave), P3 = outline (contorno).
  if (priority === 'P1') return 'bg-primary text-on-primary';
  if (priority === 'P2') return 'bg-surface-container-high text-on-surface';
  return 'border border-surface-border text-outline bg-transparent';
}

/** Sub-linha de contato exibida na tabela (phone/email do contexto, se houver). */
export function contactLine(conversation: Conversation): string {
  const context = conversation.context ?? {};
  return context.email ?? context.phone ?? conversation.channel_instance_id ?? '';
}

/** Preview de mensagem (sem a API de mensagens exposta na página). */
export function previewLine(conversation: Conversation): string {
  const context = Object.values(conversation.context ?? {}).find(Boolean);
  return context || 'Nova mensagem no canal.';
}
