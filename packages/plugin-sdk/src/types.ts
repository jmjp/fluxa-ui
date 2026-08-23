import type React from 'react';

/** Regiões visuais que um painel de plugin pode ocupar. */
export type UISlot = 'main' | 'sidebar' | 'tab_1' | 'tab_2' | string;

export interface PluginPanelProps<P = unknown> {
  conversationId: string;
  stepId: string;
  context: Record<string, string>;
  config: Record<string, string>;
  /** Dados específicos do plugin, retornados durante a execução. */
  data?: P;
  /** Devolve atualizações de contexto ou transições sugeridas ao Agent UI. */
  onAction: (action: PluginAction) => void;
}

export type PluginAction =
  | { type: 'context_update'; updates: Record<string, string> }
  | { type: 'suggest_transition'; toStepId: string }
  | { type: 'log'; message: string };

export interface PluginPanel<P = unknown> {
  slot: UISlot;
  component: React.ComponentType<PluginPanelProps<P>>;
  /** Nome de exibição opcional no manifest da UI. */
  displayName?: string;
}
