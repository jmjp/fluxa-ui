'use client';
import { useEffect, useMemo, useState } from 'react';
import type { Conversation, PluginCapabilityUI, WorkflowStep } from '@fluxa/shared';
import type { PluginAction, UISlot } from '@fluxa/plugin-sdk';
import { clear, getPanelsForSlot, loadPluginPanels } from '@/lib/plugin-loader';
import { PluginSlot } from './plugin-slot';

// Referência estável para o default: se usarmos `= []` inline, cada render cria um
// array novo e o useEffect de `capabilities` roda em loop infinito (trava a UI).
const EMPTY_CAPABILITIES: Array<{ baseURL: string; manifest: PluginCapabilityUI }> = [];

// Ordem das slots e o nome do container único onde os painéis serão somados.
const SLOT_ORDER: UISlot[] = ['sidebar', 'main', 'tab_1', 'tab_2'];

/**
 * Carrega os painéis dos plugins e os renderiza como **um único quadrado**.
 * O plugin é responsável pela própria personalização interna; aqui só
 * entregamos um container único (sem cartões individuais por slot).
 */
export function StepPluginPanel({
  conversation,
  currentStep,
  capabilities = EMPTY_CAPABILITIES,
  onTransition,
}: {
  conversation: Conversation;
  currentStep: WorkflowStep;
  capabilities?: Array<{ baseURL: string; manifest: PluginCapabilityUI }>;
  onTransition: (id: string) => void;
}) {
  const [ready, setReady] = useState(0);
  const [context, setContext] = useState(conversation.context);

  useEffect(() => {
    clear();
    Promise.all(capabilities.map(({ baseURL, manifest }) => loadPluginPanels(baseURL, manifest)))
      .catch(() => undefined)
      .finally(() => setReady((value) => value + 1));
    return clear;
  }, [capabilities]);

  const action = (event: PluginAction) => {
    if (event.type === 'context_update') setContext((old) => ({ ...old, ...event.updates }));
    if (event.type === 'suggest_transition') onTransition(event.toStepId);
  };

  // `config` carrega a identidade da conversa selecionada, para painéis que
  // precisam injetar mensagens do cliente (inbound) no backend real — ex.: o
  // painel de chat, que usa `channel` + `customer_ref` na deduplicação do
  // `Ingest` do core. Inofensivo para o painel de cartões.
  const props = {
    conversationId: conversation.id,
    stepId: String(currentStep.id),
    context,
    config: { customer_ref: conversation.customer_ref, channel: conversation.channel },
    onAction: action,
  };

  const allPanels = useMemo(
    () => SLOT_ORDER.flatMap((slot) => getPanelsForSlot(slot)),
    [ready],
  );

  void ready;

  return <PluginSlot slotName="square" panels={allPanels} props={props} />;
}
