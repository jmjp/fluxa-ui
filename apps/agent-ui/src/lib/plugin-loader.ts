import * as React from 'react';
import { setReactBridge } from '@fluxa/plugin-sdk';
import type { PluginPanel, UISlot } from '@fluxa/plugin-sdk';
import type { PluginCapabilityUI } from '@fluxa/shared';

// Publica o React do host para os bundles remotos. Os painéis de plugin são
// compilados para `globalThis.__FLUXA_REACT__.createElement`, então usam a
// MESMA instância de React do Agent UI (sem "multiple instances of React").
// Deve rodar antes de qualquer `loadPluginPanels`.
setReactBridge(React);

const panels = new Map<string, PluginPanel>();
let sequence = 0;

/** Registra painéis de bundles ESM carregados em tempo de execução. */
export function registerPanel(panel: PluginPanel): void {
  panels.set(`${String(panel.slot)}:${panel.displayName ?? 'panel'}:${sequence++}`, panel);
}

export async function loadPluginPanels(baseURL: string, manifest: PluginCapabilityUI): Promise<void> {
  const url = new URL(manifest.bundle_url, baseURL).toString();
  const bundle = (await import(/* webpackIgnore: true */ url)) as Record<string, unknown>;
  const exported = bundle[manifest.component_export];
  if (!Array.isArray(exported)) throw new Error(`Export ${manifest.component_export} não contém painéis`);
  exported.forEach((panel) => registerPanel(panel as PluginPanel));
}

export function getPanelsForSlot(slot: UISlot): PluginPanel[] {
  return [...panels.values()].filter((panel) => panel.slot === slot);
}

export function clear(): void { panels.clear(); sequence = 0; }
