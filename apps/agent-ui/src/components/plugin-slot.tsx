'use client';
import { Component, type ErrorInfo, type ReactNode, Suspense } from 'react';
import type { PluginPanel, PluginPanelProps } from '@fluxa/plugin-sdk';
class PanelBoundary extends Component<{ children: ReactNode }, { failed: boolean }> { override state = { failed: false }; static getDerivedStateFromError() { return { failed: true }; } override componentDidCatch(_error: Error, _info: ErrorInfo) {} override render() { return this.state.failed ? <p className="rounded border border-destructive p-3 text-sm text-destructive">Não foi possível carregar o painel.</p> : this.props.children; } }
export function PluginSlot({ slotName, panels, props }: { slotName: string; panels: PluginPanel[]; props: PluginPanelProps }) {
  if (!panels.length) return <div className="rounded-md border border-dashed p-4 text-sm text-muted-foreground">Nenhum painel em {slotName}.</div>;
  return <Suspense fallback={<div className="h-24 animate-pulse rounded bg-muted" />}><PanelBoundary>{panels.map((panel, index) => { const Panel = panel.component; return <section key={`${panel.displayName ?? slotName}-${index}`} className="rounded-md border p-3"><Panel {...props} /></section>; })}</PanelBoundary></Suspense>;
}
