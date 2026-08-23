import type { Timestamp } from './common';

/** Direcao de uma mensagem. */
export type MessageDirection = 'inbound' | 'outbound' | 'system';

export interface ConversationMessage {
  id: string;
  conversation_id: string;
  direction: MessageDirection;
  body: string;
  /** Quem enviou (customer_ref, agent_id, ou "system"). */
  sender: string;
  created_at: Timestamp;
  /** Metadata especifica do canal de origem. */
  metadata?: Record<string, string>;
}

export type QueueStatus = 'waiting' | 'assigned' | 'in_progress' | 'closed';

export interface Conversation {
  id: string;
  channel: string; // "webchat", "whatsapp", "telegram"...
  channel_instance_id: string;
  customer_ref: string;
  context: Record<string, string>;
  current_step_id?: string;
  queue_id?: string;
  queue_status: QueueStatus;
  created_at: Timestamp;
  updated_at: Timestamp;
}
