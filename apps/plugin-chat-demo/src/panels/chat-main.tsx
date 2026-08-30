'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { PluginPanelProps } from '@fluxa/plugin-sdk';
import { fetchThread, formatTime, sendInbound, type ThreadMessage } from '../lib/api';
import { FCW_CSS } from './chat.css';

/**
 * Painel principal: a conversa REAL entre cliente e atendente, gravada no core
 * `fluxa-api`. O painel é a *janela do cliente* — mostra a thread real da
 * conversa selecionada e, pelo composer, injeta mensagens do cliente (inbound)
 * via `POST /api/channels/webchat_sim/messages`. As respostas do atendente
 * (outbound) chegam por poll na mesma thread.
 *
 * O que era scripted antes (AGENT_TURNS, PAYMENT_INTENT, DEMO_ORDER, cartão
 * rico, régua de avaliação) foi removido: quem dirige a FSM é o atendente, na
 * console. O painel só reflete a thread e colhe o input do cliente.
 *
 * Semântica das classes (`.fcw`): `in` = bolha esquerda/surface (agente),
 * `out` = bolha direita/accent (cliente). No core, `direction=inbound` é a
 * mensagem do cliente (=`out`), `outbound` é a do agente (=`in`).
 */
export function ChatMain({ conversationId, context, config }: PluginPanelProps) {
  const [thread, setThread] = useState<ThreadMessage[]>([]);
  const [draft, setDraft] = useState('');
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sinceRef = useRef<string | null>(null);
  const threadRef = useRef<HTMLDivElement | null>(null);

  const customerRef = config.customer_ref ?? '';

  /** Load da thread (incremental via `since`), dedup por id, ordenar por data. */
  const loadThread = useCallback(async () => {
    try {
      const list = await fetchThread(conversationId, sinceRef.current ?? undefined);
      setThread((old) => {
        const merged = new Map<string, ThreadMessage>();
        for (const msg of old) merged.set(msg.id, msg);
        for (const msg of list) merged.set(msg.id, msg);
        return [...merged.values()].sort(
          (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
        );
      });
      const latest = list.reduce<string | null>(
        (acc, msg) => (acc && acc >= msg.created_at ? acc : msg.created_at),
        null,
      );
      if (latest) sinceRef.current = latest;
      setError(null);
    } catch (err) {
      // Em falha momentânea NUNCA limpar a thread — apenas sinalizar.
      setError(err instanceof Error ? err.message : 'falha ao carregar a conversa');
    }
  }, [conversationId]);

  const scrollToEnd = useCallback(() => {
    const el = threadRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, []);

  useEffect(() => {
    sinceRef.current = null;
    setThread([]);
    void loadThread();

    // Sincronização ao vivo: o atendente responde na console e o painel reflete
    // em ~2s. `since` evita repetir a thread; o dedup por id cobre corrida.
    const poll = window.setInterval(() => void loadThread(), 2000);
    return () => window.clearInterval(poll);
  }, [conversationId, loadThread]);

  useEffect(() => {
    requestAnimationFrame(scrollToEnd);
  }, [thread.length, scrollToEnd]);

  const send = useCallback(async () => {
    const value = draft.trim();
    if (!value || sending || !customerRef) return;
    setSending(true);
    try {
      await sendInbound({ customerRef, text: value, channel: config.channel });
      setDraft('');
      await loadThread();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'não foi possível enviar');
    } finally {
      setSending(false);
    }
  }, [draft, sending, customerRef, config.channel, loadThread]);

  const headStatus = useMemo(
    () => `Online agora${context.order_number ? ` · ${context.order_number}` : ''}`,
    [context.order_number],
  );

  return (
    <div className="fcw">
      <style>{FCW_CSS}</style>
      <div className="fcw-panel" role="dialog" aria-label="Chat com a Fluxa">
        <div className="fcw-head">
          <span className="fcw-brand-avatar" aria-hidden="true">
            F
          </span>
          <div className="fcw-head-id">
            <div className="fcw-name">Fluxa · Atendimento</div>
            <div className="fcw-status">
              <span className="dot" />
              {headStatus}
            </div>
          </div>
          <div className="fcw-head-actions">
            <span className="fcw-num fcw-iconbtn" title={`Conversa ${conversationId}`} aria-label={`Conversa ${conversationId}`}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <path d="M21 12a8 8 0 0 1-8 8H4l2-3a8 8 0 1 1 15-5z" />
              </svg>
            </span>
          </div>
        </div>

        <div className="fcw-thread" ref={threadRef} role="log" aria-live="polite">
          <span className="fcw-day">Hoje</span>

          {thread.length === 0 && !error && (
            <div className="fcw-day">Carregando conversa…</div>
          )}

          {thread.map((msg) => {
            const side = msg.direction === 'inbound' ? 'out' : 'in';
            return (
              <div key={msg.id} className={`fcw-msg ${side}`}>
                <div className="fcw-bubble">{msg.body}</div>
                <span className="fcw-when">{formatTime(msg.created_at)}</span>
              </div>
            );
          })}

          {error && (
            <div className="fcw-msg in">
              <div className="fcw-bubble">{error}</div>
              <span className="fcw-when">—</span>
            </div>
          )}
        </div>

        <div className="fcw-composer">
          <form
            className="fcw-composer-box"
            onSubmit={(event) => {
              event.preventDefault();
              void send();
            }}
          >
            <textarea
              rows={1}
              value={draft}
              placeholder={customerRef ? 'Escreva sua mensagem…' : 'Nenhuma conversa selecionada'}
              aria-label="Escreva sua mensagem"
              disabled={!customerRef}
              onChange={(event) => setDraft(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' && !event.shiftKey) {
                  event.preventDefault();
                  void send();
                }
              }}
            />
            <button
              className="fcw-send"
              type="submit"
              aria-label="Enviar mensagem"
              disabled={sending || !customerRef || !draft.trim()}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 12l18-8-6 18-3.5-6.5L3 12z" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
