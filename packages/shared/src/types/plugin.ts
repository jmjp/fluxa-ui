import type { Timestamp } from './common';

export type PluginStatus = 'installed' | 'enabled' | 'disabled';

export type PluginRuntime = 'http' | 'grpc' | 'wasm';

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
  /** Bundle JS publicado pelo plugin (Module Federation). */
  bundle_url?: string;
  component_name?: string;
}
