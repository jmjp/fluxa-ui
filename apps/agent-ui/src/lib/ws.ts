export type FluxaEventName = 'message_inbound' | 'message_outbound' | 'transition' | 'intent_suggested' | 'plugin_unavailable';
export type FluxaEvent = { type: FluxaEventName; payload: unknown };
type Listener = (event: FluxaEvent) => void;

/** Cliente WS com reconexão exponencial para eventos da conversa. */
export class FluxaWebSocket {
  private socket?: WebSocket;
  private readonly target = new EventTarget();
  private attempt = 0;
  private stopped = false;
  constructor(private readonly url: string) {}
  connect(): void {
    this.stopped = false;
    this.socket = new WebSocket(this.url);
    this.socket.onopen = () => { this.attempt = 0; };
    this.socket.onmessage = (message) => { const event = JSON.parse(String(message.data)) as FluxaEvent; this.target.dispatchEvent(new CustomEvent(event.type, { detail: event })); };
    this.socket.onclose = () => { if (!this.stopped) this.reconnect(); };
    this.socket.onerror = () => this.socket?.close();
  }
  on(type: FluxaEventName, listener: Listener): () => void { const handler = (event: Event) => listener((event as CustomEvent<FluxaEvent>).detail); this.target.addEventListener(type, handler); return () => this.target.removeEventListener(type, handler); }
  close(): void { this.stopped = true; this.socket?.close(); }
  private reconnect(): void { const delay = Math.min(1000 * 2 ** this.attempt++, 30_000); window.setTimeout(() => this.connect(), delay); }
}
