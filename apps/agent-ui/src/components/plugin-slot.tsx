'use client';
import { Component, type ErrorInfo, type ReactNode, Suspense } from 'react';
import type { PluginPanel, PluginPanelProps } from '@fluxa/plugin-sdk';

class PanelBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  override state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  override componentDidCatch(_error: Error, _info: ErrorInfo) {}
  override render() {
    return this.state.failed ? (
      <p className="rounded-xl border border-surface-border p-3 text-sm text-error">Não foi possível carregar o painel.</p>
    ) : (
      this.props.children
    );
  }
}

/**
 * Renderiza os painéis de plugin como **um único bloco quadrado** (sem cartões
 * individuais e sem placeholder nas slots vazias) — a personalização do layout
 * fica dentro do próprio plugin. Painéis múltiplos são separados por uma linha.
 */
export function PluginSlot({ slotName, panels, props }: { slotName: string; panels: PluginPanel[]; props: PluginPanelProps }) {
  if (!panels.length) return null;
  return (
    <Suspense fallback={<div className="h-24 animate-pulse rounded bg-surface-container-high" />}>
      <PanelBoundary>
        <div className="divide-y divide-surface-border overflow-hidden rounded-xl border border-surface-border bg-surface-container-lowest">
          {panels.map((panel, index) => {
            const Panel = panel.component;
            return <Panel key={`${panel.displayName ?? slotName}-${index}`} {...props} />;
          })}
        </div>
      </PanelBoundary>
    </Suspense>
  );
}
