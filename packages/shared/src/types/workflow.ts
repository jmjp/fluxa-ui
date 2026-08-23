import type { ID, Timestamp } from './common';

/** Status de um workflow no sistema. */
export type WorkflowStatus = 'draft' | 'published';

/** Tipo de transição entre steps. */
export type TransitionType = 'manual' | 'intent' | 'auto_rule' | 'timeout';

/** Uma etapa dentro de um workflow. */
export interface WorkflowStep {
  id: ID;
  name: string;
  /** Capability que esta etapa declara (ex: "step.triagem"). */
  capability?: string;
  /** Plugins de step que esta etapa carrega (multi-slot UI, PRD §6.5). */
  plugins?: StepPluginRef[];
  /** Escopos de dado exigidos pela etapa. */
  data_requirements?: string[];
  /** Se true, encerra a conversa ao entrar. */
  end?: boolean;
  transitions: Transition[];
}

export interface StepPluginRef {
  plugin_ref: string; // "nome@versão"
  capability: string;
  ui_slot: string; // "main", "sidebar", "tab_1"...
  config?: Record<string, string>;
}

export interface Transition {
  to: ID; // step destino
  type: TransitionType;
  /** Expressão ou intent_id esperado (PRD §7.2). */
  condition?: string;
  /** TTL em segundos (apenas para transitions tipo "timeout"). */
  ttl_seconds?: number;
}

export interface Workflow {
  id: ID;
  name: string;
  version: number;
  status: WorkflowStatus;
  steps: WorkflowStep[];
  created_at: Timestamp;
  updated_at: Timestamp;
}

/** Versão imutável de um workflow (PRD §8.1: "Publicar gera versão imutável"). */
export interface WorkflowVersion {
  id: ID;
  workflow_id: ID;
  version: number;
  definition: Workflow;
  created_at: Timestamp;
}
