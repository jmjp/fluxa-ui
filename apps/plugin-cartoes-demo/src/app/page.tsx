'use client';

import { useCallback, useMemo, useState } from 'react';
import type { PluginAction, PluginPanelProps } from '@fluxa/plugin-sdk';
import panels from '../panels';
import { DEMO_CARDS } from '../panels/cards-data';
import { PCX_CSS } from '../panels/pcx.css';

const mainPanel = panels.find((panel) => panel.slot === 'main');
const sidebarPanel = panels.find((panel) => panel.slot === 'sidebar');

/**
 * Preview standalone do plugin: renderiza os painéis registrados com estado de
 * contexto compartilhado, espelhando o StepPluginPanel do Agent UI. Acessível
 * em http://localhost:3002.
 */
export default function PluginDemoPage() {
  const [context, setContext] = useState<Record<string, string>>({ selected_card: DEMO_CARDS[0]?.id ?? '' });

  const action = useCallback((event: PluginAction) => {
    if (event.type === 'context_update') setContext((old) => ({ ...old, ...event.updates }));
    if (event.type === 'suggest_transition') console.log('suggest_transition', event.toStepId);
  }, []);

  const props = useMemo<PluginPanelProps>(
    () => ({ conversationId: 'conv_demo_maria', stepId: 'cartoes', context, config: {}, onAction: action }),
    [context, action],
  );

  return (
    <main style={{ minHeight: '100vh', background: '#eef1f4', padding: '24px', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <style>{PCX_CSS}</style>
      <header style={{ maxWidth: 1100, margin: '0 auto 16px' }}>
        <h1 style={{ fontSize: 20, fontWeight: 700, margin: 0 }}>Plugin de Cartões — preview</h1>
        <p style={{ fontSize: 13, color: '#434655', margin: '4px 0 0' }}>{panels.length} painéis compõem o contexto do workflow.</p>
      </header>
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 340px', gap: 20, alignItems: 'start' }}>
        <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #e2e8f0', padding: 20 }}>
          {mainPanel ? <mainPanel.component {...props} /> : <p>Nenhum painel na slot main.</p>}
        </div>
        <aside style={{ background: '#fff', borderRadius: 16, border: '1px solid #e2e8f0', padding: 20 }}>
          {sidebarPanel ? <sidebarPanel.component {...props} /> : <p>Nenhum painel na slot sidebar.</p>}
        </aside>
      </div>
      <pre style={{ maxWidth: 1100, margin: '20px auto 0', fontSize: 11, color: '#434655', whiteSpace: 'pre-wrap' }}>
        {JSON.stringify({ conversationId: props.conversationId, stepId: props.stepId, context }, null, 2)}
      </pre>
    </main>
  );
}
