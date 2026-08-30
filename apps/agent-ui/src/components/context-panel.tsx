'use client';

import type { Conversation, PluginCapabilityUI, WorkflowStep } from '@fluxa/shared';
import { Icon } from './icon';
import { LLMSuggestionBanner } from './llm-suggestion-banner';
import { ManualControls } from './manual-controls';
import { StepPluginPanel } from './step-plugin-panel';
import { channelMeta, stepIcon, stepLabel } from '@/lib/ui';

/**
 * Painel de contexto à direita da conversa (estilo do protótipo): "Contexto da
 * conversa" com a etapa atual, a sugestão do Assist, os dados do cliente, a
 * transição manual e o bloco quadrado de personalização do plugin.
 */
export function ContextPanel({
  conversation,
  currentStep,
  capabilities,
  onTransition,
  showHeader = true,
}: {
  conversation: Conversation;
  currentStep: WorkflowStep;
  capabilities?: Array<{ baseURL: string; manifest: PluginCapabilityUI }>;
  onTransition: (id: string) => void;
  showHeader?: boolean;
}) {
  const channelLabel = channelMeta(conversation.channel).label;

  return (
    <div className="flex h-full flex-col overflow-hidden bg-surface-container-lowest">
      {showHeader && (
        <div className="border-b border-surface-border px-[18px] py-4">
          <h2 className="text-[14px] font-semibold text-on-surface">Contexto da conversa</h2>
          <div className="mt-0.5 font-code-sm text-[11px] text-outline">workflow ativo</div>
        </div>
      )}

      <div className="custom-scrollbar flex-1 overflow-y-auto px-[18px] py-[18px]">
        {/* Etapa atual */}
        <div>
          <label className="mb-1.5 block font-code-sm text-[10.5px] uppercase tracking-[0.05em] text-outline">Etapa atual</label>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary bg-accent-soft px-2.5 py-1 font-code-sm text-[11px] font-medium text-primary">
            <Icon name={stepIcon(conversation.current_step_id)} className="text-[14px]" />
            {stepLabel(conversation.current_step_id)}
          </span>
        </div>

        {/* Sugestão do Assist */}
        <LLMSuggestionBanner
          title="Sugestão do Assist"
          description="Cliente fala de cartão — avance para “Cartões”."
          onApply={() => onTransition('cartoes')}
        />

        {/* Dados do cliente */}
        <div className="overflow-hidden rounded-xl border border-surface-border">
          <div className="flex items-center justify-between border-b border-surface-border bg-surface-container-low px-3.5 py-3">
            <span className="text-[13px] font-semibold text-on-surface">Dados do cliente</span>
            <span className="font-code-sm text-[11px] text-outline">CRM</span>
          </div>
          <div className="grid gap-2.5 px-3.5 py-3.5">
            <div className="grid grid-cols-2 gap-2.5">
              <span className="text-[11.5px] text-outline">Nome</span>
              <span className="text-[13px] font-medium text-on-surface">{conversation.customer_ref}</span>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              <span className="text-[11.5px] text-outline">Canal</span>
              <span className="text-[13px] font-medium text-on-surface">{channelLabel}</span>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              <span className="text-[11.5px] text-outline">ID da conversa</span>
              <span className="font-code-sm text-[12.5px] font-medium text-on-surface">{conversation.id.toUpperCase()}</span>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              <span className="text-[11.5px] text-outline">Segmento</span>
              <span className="text-[13px] font-medium text-on-surface">Premium</span>
            </div>
          </div>
        </div>

        {/* Transição manual */}
        <div>
          <label className="mb-1.5 block font-code-sm text-[10.5px] uppercase tracking-[0.05em] text-outline">Transição manual</label>
          <ManualControls
            steps={['triagem', 'cartoes', 'fatura', 'avaliação']}
            currentStepId={conversation.current_step_id}
            onTransition={onTransition}
          />
        </div>

        {/* Bloco quadrado do plugin (personalização fica dentro do plugin) */}
        <StepPluginPanel
          conversation={conversation}
          currentStep={currentStep}
          capabilities={capabilities}
          onTransition={onTransition}
        />
      </div>
    </div>
  );
}
