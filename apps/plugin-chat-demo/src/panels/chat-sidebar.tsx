'use client';

import type { PluginPanelProps } from '@fluxa/plugin-sdk';
import { DEMO_ORDER } from './chat-data';
import { FCW_CSS } from './chat.css';

const CONTEXT_LABELS: Record<string, string> = {
  order_number: 'Pedido',
  order_item: 'Item',
  order_status: 'Status',
  order_total: 'Total',
  channel: 'Canal',
  rating: 'Avaliação',
};

/** Chips de contexto neutros (sem os valores pré-preenchidos do pedido). */
const DEFAULT_CONTEXT: Array<[string, string]> = [
  ['channel', 'webchat'],
  ['language', 'pt-BR'],
  ['account', 'verada-loft'],
];

/**
 * Painel lateral: contexto da conversa e ações de transição para o Agent UI.
 * Lê os valores identificados no painel principal (via `context_update`) e
 * sugere a próxima etapa do workflow (via `suggest_transition`).
 */
export function ChatSidebar({ context, onAction }: PluginPanelProps) {
  const orderRows: Array<[string, string]> = [
    ['Pedido', context.order_number ?? DEMO_ORDER.number],
    ['Item', context.order_item ?? DEMO_ORDER.item],
    ['Status', context.order_status ?? DEMO_ORDER.status],
    ['Total', context.order_total ?? DEMO_ORDER.total],
  ];

  const otherCtx = [
    ...DEFAULT_CONTEXT,
    ...Object.entries(context).filter(([key]) => !orderRows.some(([k]) => k === key)),
  ].filter(([, value]) => value);

  return (
    <div className="fcw">
      <style>{FCW_CSS}</style>
      <h3 className="fcw-detail__title">Contexto da conversa</h3>
      <dl className="fcw-rows">
        {orderRows.map(([k, v]) => (
          <div className="fcw-row" key={k}>
            <dt>{CONTEXT_LABELS[k] ?? k}</dt>
            <dd>{v}</dd>
          </div>
        ))}
      </dl>

      <div className="fcw-actions">
        <button
          type="button"
          className="fcw-btn fcw-btn--ghost"
          onClick={() => onAction({ type: 'suggest_transition', toStepId: 'pagamento' })}
        >
          Sugerir Pagamento
        </button>
        <button
          type="button"
          className="fcw-btn fcw-btn--primary"
          onClick={() =>
            onAction({
              type: 'context_update',
              updates: { order_status: 'Pago', resolution: 'link_pix' },
            })
          }
        >
          Registrar quitação
        </button>
      </div>

      {otherCtx.length > 0 && (
        <div className="fcw-context">
          <p className="fcw-context__title">Contexto acumulado</p>
          <div className="fcw-chips">
            {otherCtx.map(([key, value]) => (
              <span key={key} className="fcw-chipctx">
                {key}={value}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
