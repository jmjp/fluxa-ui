import type { FluxaEvent, FluxaEventName } from './ws';
type Listener = (event: FluxaEvent) => void;
/** Fallback temporário: tenta WS e atualiza conversas via polling quando o core responde 404. */
export class FluxaWebSocketMock {
  private readonly target = new EventTarget(); private timer?: number;
  constructor(private readonly apiURL: string) {}
  connect(): void { this.poll(); this.timer = window.setInterval(() => this.poll(), 3000); }
  on(type: FluxaEventName, listener: Listener): () => void { const handler = (event: Event) => listener((event as CustomEvent<FluxaEvent>).detail); this.target.addEventListener(type, handler); return () => this.target.removeEventListener(type, handler); }
  close(): void { if (this.timer) window.clearInterval(this.timer); }
  private async poll(): Promise<void> { try { const response = await fetch(`${this.apiURL.replace(/\/$/, '')}/api/v1/conversations`); if (!response.ok) return; const payload = await response.json() as unknown; this.target.dispatchEvent(new CustomEvent('message_inbound', { detail: { type: 'message_inbound', payload } satisfies FluxaEvent })); } catch { /* API offline é um estado esperado durante o mock. */ } }
}
