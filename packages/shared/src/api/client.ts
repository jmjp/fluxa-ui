/**
 * Cliente HTTP tipado para a API pública do Fluxa.
 *
 * Endpoints documentados em `internal/adapters/in/http/` do core.
 * Base URL configurável via `NEXT_PUBLIC_FLUXA_API_URL` (Agent UI)
 * ou `NEXT_PUBLIC_ADMIN_API_URL` (Admin UI).
 */
import type { Agent } from '../types/agent';
import type { Conversation, ConversationMessage } from '../types/conversation';
import type { Plugin } from '../types/plugin';
import type { Queue } from '../types/queue';
import type { Workflow, WorkflowVersion } from '../types/workflow';

export class FluxaAPIError extends Error {
  constructor(
    public readonly status: number,
    public readonly body: unknown,
    message: string,
  ) {
    super(message);
    this.name = 'FluxaAPIError';
  }
}

interface APIEnvelope<T> {
  data?: T;
  error?: { message: string; code?: string };
}

export class FluxaClient {
  constructor(
    private readonly baseURL: string,
    private readonly fetchImpl: typeof fetch = fetch,
  ) {}

  private async request<T>(
    method: string,
    path: string,
    body?: unknown,
  ): Promise<T> {
    const url = `${this.baseURL.replace(/\/$/, '')}${path}`;
    const res = await this.fetchImpl(url, {
      method,
      headers: body ? { 'Content-Type': 'application/json' } : {},
      body: body ? JSON.stringify(body) : undefined,
    });
    const text = await res.text();
    let parsed: APIEnvelope<T> = {};
    try {
      parsed = text ? (JSON.parse(text) as APIEnvelope<T>) : {};
    } catch {
      throw new FluxaAPIError(res.status, text, `invalid JSON from ${url}`);
    }
    if (!res.ok || parsed.error) {
      throw new FluxaAPIError(
        res.status,
        parsed.error ?? text,
        parsed.error?.message ?? `HTTP ${res.status} from ${url}`,
      );
    }
    return parsed.data as T;
  }

  // --- Workflows ---

  listWorkflows() {
    return this.request<Workflow[]>('GET', '/api/v1/workflows');
  }
  createWorkflow(body: { name: string; steps: Workflow['steps'] }) {
    return this.request<Workflow>('POST', '/api/v1/workflows', body);
  }
  publishWorkflow(id: string) {
    return this.request<Workflow>('POST', `/api/v1/workflows/${id}/publish`);
  }
  listWorkflowVersions(workflowId: string) {
    return this.request<WorkflowVersion[]>(
      'GET',
      `/api/v1/workflows/${workflowId}/versions`,
    );
  }

  // --- Plugins ---

  listPlugins() {
    return this.request<Plugin[]>('GET', '/api/v1/plugins');
  }
  scanPlugins(dir: string) {
    return this.request<Plugin[]>('POST', '/api/v1/plugins/scan', { dir });
  }
  installPlugin(path: string) {
    return this.request<Plugin>('POST', '/api/v1/plugins/install', { path });
  }
  activatePlugin(name: string, version: string) {
    return this.request<Plugin>(
      'POST',
      `/api/v1/plugins/${name}/${version}/activate`,
    );
  }
  deactivatePlugin(name: string, version: string) {
    return this.request<Plugin>(
      'POST',
      `/api/v1/plugins/${name}/${version}/deactivate`,
    );
  }
  registerPlugin(body: {
    name: string;
    version: string;
    base_url: string;
    capabilities: string[];
  }) {
    return this.request<Plugin>('POST', '/api/v1/plugins/register', body);
  }
  healthCheckPlugin(name: string, version: string) {
    return this.request<{ healthy: boolean; message?: string }>(
      'GET',
      `/api/v1/plugins/${name}/${version}/health`,
    );
  }

  // --- Canais ---

  listChannels() {
    return this.request<
      Array<{
        id: string;
        name: string;
        capability_id: string;
        plugin_name: string;
        plugin_version: string;
        status: 'enabled' | 'disabled';
      }>
    >('GET', '/api/v1/channels');
  }
  bindChannel(body: {
    channel_id: string;
    name: string;
    capability_id: string;
    plugin_name: string;
    plugin_version: string;
    config?: Record<string, string>;
  }) {
    return this.request('POST', '/api/v1/channels', body);
  }
  setChannelStatus(channelId: string, status: 'enabled' | 'disabled') {
    return this.request('POST', `/api/v1/channels/${channelId}/status`, { status });
  }

  // --- Conversas ---

  listConversations() {
    return this.request<Conversation[]>('GET', '/api/v1/conversations');
  }
  getConversation(id: string) {
    return this.request<Conversation>('GET', `/api/v1/conversations/${id}`);
  }
  listMessages(conversationId: string) {
    return this.request<ConversationMessage[]>(
      'GET',
      `/api/v1/conversations/${conversationId}/messages`,
    );
  }
  sendAgentMessage(conversationId: string, body: string) {
    return this.request('POST', `/api/v1/conversations/${conversationId}/messages`, { body });
  }
  transitionConversation(conversationId: string, toStepId: string) {
    return this.request('POST', `/api/v1/conversations/${conversationId}/transition`, {
      to_step_id: toStepId,
    });
  }
  pickupConversation(conversationId: string) {
    return this.request('POST', `/api/v1/conversations/${conversationId}/pickup`);
  }

  // --- Agentes ---

  listAgents() {
    return this.request<Agent[]>('GET', '/api/v1/agents');
  }
  createAgent(body: { name: string; skills?: string[] }) {
    return this.request<Agent>('POST', '/api/v1/agents', body);
  }
  setAgentStatus(agentId: string, status: Agent['status']) {
    return this.request('POST', `/api/v1/agents/${agentId}/status`, { status });
  }

  // --- Filas ---

  listQueues() {
    return this.request<Queue[]>('GET', '/api/v1/queues');
  }
  createQueue(body: {
    name: string;
    routing_rule: Queue['routing_rule'];
    workflow_ids?: string[];
    eligible_agent_ids?: string[];
  }) {
    return this.request<Queue>('POST', '/api/v1/queues', body);
  }
  getQueue(id: string) {
    return this.request<Queue>('GET', `/api/v1/queues/${id}`);
  }
}

/** Cria um cliente apontando para a API do core Fluxa. */
export function createClient(baseURL: string): FluxaClient {
  return new FluxaClient(baseURL);
}
