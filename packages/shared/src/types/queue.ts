import type { ID, Timestamp } from './common';

export type QueueRoutingRule = 'round_robin' | 'menor_carga' | 'skill_match';

export interface Queue {
  id: ID;
  name: string;
  routing_rule: QueueRoutingRule;
  /** Workflows que alimentam esta fila. */
  workflow_ids: ID[];
  /** IDs dos agentes elegiveis para receber conversas desta fila. */
  eligible_agent_ids: ID[];
  created_at: Timestamp;
  updated_at: Timestamp;
}
