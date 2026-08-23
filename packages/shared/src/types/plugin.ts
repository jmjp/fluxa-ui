import type { Timestamp } from './common';

export type PluginStatus = 'installed' | 'enabled' | 'disabled';

export type PluginRuntime = 'http' | 'grpc' | 'wasm';

/** Regiões de layout disponíveis ao carregar painéis de plugins. */
export type UISlot = 'main' | 'sidebar' | 'tab_1' | 'tab_2' | string;

export interface Plugin {
  name: string;
  version: string;
  status: PluginStatus;
  runtime: PluginRuntime;
  /** Path do binario ou URL base. */
  entrypoint?: string;
  /** Endpoint HTTP ou socket gRPC do plugin em execução. */
  base_url?: string;
  capabilities: string[];
  permissions: string[];
  healthy: boolean;
  last_health_check?: Timestamp;
  installed_at?: Timestamp;
  // Mantemos `ID` apenas como referência de dominio; aqui usamos string.
}

/** Capability de um plugin exposta para o Agent UI (PRD §6.5). */
export interface PluginCapabilityUI {
  id: string;
  display_name: string;
  /** URL do bundle ESM publicado pelo plugin, relativa à sua base. */
  bundle_url: string;
  /** Export do bundle que contém os painéis (normalmente `default`). */
  component_export: string;
  /** Slots declarados pelo plugin para composição do Agent UI. */
  slots: Array<{ name: UISlot; display_name: string }>;
  /** Configuração inicial entregue a cada painel carregado. */
  default_config?: Record<string, string>;
}
