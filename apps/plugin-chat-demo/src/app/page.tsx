'use client';

import { useCallback, useMemo, useState } from 'react';
import type { PluginAction, PluginPanelProps } from '@fluxa/plugin-sdk';
import panels from '../panels';
import { FCW_CSS } from '../panels/chat.css';

const mainPanel = panels.find((panel) => panel.slot === 'main');
const sidebarPanel = panels.find((panel) => panel.slot === 'sidebar');

/**
 * Preview standalone do plugin: renderiza os painéis registrados com estado de
 * contexto compartilhado, espelhando o StepPluginPanel do Agent UI. Acessível
 * em http://localhost:3004.
 */
export default function PluginDemoPage() {
  const [context, setContext] = useState<Record<string, string>>({});

  const action = useCallback((event: PluginAction) => {
    if (event.type === 'context_update') setContext((old) => ({ ...old, ...event.updates }));
    if (event.type === 'suggest_transition') console.log('suggest_transition', event.toStepId);
    if (event.type === 'log') console.log('log', event.message);
  }, []);

  const props = useMemo<PluginPanelProps>(
    () => ({ conversationId: 'conv_demo_verada', stepId: 'atendimento', context, config: {}, onAction: action }),
    [context, action],
  );

  return (
    <main style={{ minHeight: '100vh', background: 'oklch(98.6% 0.002 250)', padding: '24px', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <style>{FCW_CSS}</style>
      <header style={{ maxWidth: 1180, margin: '0 auto 16px' }}>
        <h1 style={{ fontSize: 20, fontWeight: 700, margin: 0, color: 'oklch(18% 0.008 250)' }}>
          Plugin de Chat — preview
        </h1>
        <p style={{ fontSize: 13, color: 'oklch(47% 0.01 250)', margin: '4px 0 0' }}>
          {panels.length} painéis compõem o contexto do workflow · simula a conversa entre cliente e atendente.
        </p>
      </header>
      <div style={{ maxWidth: 1180, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 340px', gap: 20, alignItems: 'start' }}>
        <div style={{ background: '#fff', borderRadius: 18, border: '1px solid oklch(90.5% 0.005 250)', padding: 16 }}>
          {mainPanel ? <mainPanel.component {...props} /> : <p>Nenhum painel na slot main.</p>}
        </div>
        <aside style={{ background: '#fff', borderRadius: 18, border: '1px solid oklch(90.5% 0.005 250)', padding: 16 }}>
          {sidebarPanel ? <sidebarPanel.component {...props} /> : <p>Nenhum painel na slot sidebar.</p>}
        </aside>
      </div>
      <pre style={{ maxWidth: 1180, margin: '20px auto 0', fontSize: 11, color: 'oklch(47% 0.01 250)', whiteSpace: 'pre-wrap' }}>
        {JSON.stringify({ conversationId: props.conversationId, stepId: props.stepId, context }, null, 2)}
      </pre>
    </main>
  );
}
