import type { ID, Timestamp } from './common';

export type AgentStatus = 'online' | 'away' | 'offline';

export interface Agent {
  id: ID;
  name: string;
  status: AgentStatus;
  /** Tags de skill (usadas pela regra de roteamento "skill_match"). */
  skills: string[];
  /** Numero de conversas atualmente atribuidas ao agente. */
  current_load: number;
  created_at: Timestamp;
  updated_at: Timestamp;
}
