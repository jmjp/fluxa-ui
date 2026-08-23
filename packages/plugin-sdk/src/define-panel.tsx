import type { PluginPanel } from './types';

/** Mantém a inferência de tipos ao declarar um painel de plugin. */
export function definePanel<P>(panel: PluginPanel<P>): PluginPanel<P> {
  return panel;
}
