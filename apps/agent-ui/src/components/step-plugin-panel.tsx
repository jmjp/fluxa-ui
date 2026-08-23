'use client';
import { useEffect, useState } from 'react';
import type { Conversation, PluginCapabilityUI, WorkflowStep } from '@fluxa/shared';
import type { PluginAction } from '@fluxa/plugin-sdk';
import { clear, getPanelsForSlot, loadPluginPanels } from '@/lib/plugin-loader';
import { PluginSlot } from './plugin-slot';
import { WorkflowBreadcrumb } from './workflow-breadcrumb';
import { LLMSuggestionBanner } from './llm-suggestion-banner';

export function StepPluginPanel({ conversation, currentStep, capabilities = [], onTransition }: { conversation: Conversation; currentStep: WorkflowStep; capabilities?: Array<{ baseURL: string; manifest: PluginCapabilityUI }>; onTransition: (id: string) => void }) {
  const [ready, setReady] = useState(0); const [context, setContext] = useState(conversation.context);
  useEffect(() => { clear(); Promise.all(capabilities.map(({ baseURL, manifest }) => loadPluginPanels(baseURL, manifest))).catch(() => undefined).finally(() => setReady((value) => value + 1)); return clear; }, [capabilities]);
  const action = (event: PluginAction) => { if (event.type === 'context_update') setContext((old) => ({ ...old, ...event.updates })); if (event.type === 'suggest_transition') onTransition(event.toStepId); };
  const props = { conversationId: conversation.id, stepId: String(currentStep.id), context, config: {}, onAction: action };
  const steps = ['triagem', 'cartoes', 'fatura', 'avaliação']; void ready;
  return <aside className="flex min-w-0 flex-col gap-3 overflow-y-auto p-4"><WorkflowBreadcrumb steps={steps} currentStepId={conversation.current_step_id} /><LLMSuggestionBanner intent="intent.cartoes" confidence={0.4} onApply={() => onTransition('cartoes')} /><PluginSlot slotName="main" panels={getPanelsForSlot('main')} props={props} /><PluginSlot slotName="sidebar" panels={getPanelsForSlot('sidebar')} props={props} /><div className="grid grid-cols-2 gap-2"><PluginSlot slotName="tab_1" panels={getPanelsForSlot('tab_1')} props={props} /><PluginSlot slotName="tab_2" panels={getPanelsForSlot('tab_2')} props={props} /></div></aside>;
}
