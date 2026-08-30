'use client';

import type { PluginPanelProps } from '@fluxa/plugin-sdk';
import { BRAND_LABEL, DEMO_CARDS, fmtBRL, masked } from './cards-data';
import { PCX_CSS } from './pcx.css';

/**
 * Painel lateral: dados do cartão selecionado no painel principal (via
 * `context.selected_card`). Exibe ficha, ações e o contexto acumulado.
 */
export function CartoesSidebar({ context, onAction }: PluginPanelProps) {
  const selectedId = context.selected_card;
  const card = DEMO_CARDS.find((item) => item.id === selectedId) ?? DEMO_CARDS[0]!;
  const otherCtx = Object.entries(context).filter(([key]) => key !== 'selected_card');

  return (
    <div className="pcx">
      <style>{PCX_CSS}</style>
      <div className="pcx-detail">
        <h3 className="pcx-detail__title">Dados do cartão</h3>
        <dl className="pcx-rows">
          <div className="pcx-row"><dt>Bandeira</dt><dd>{BRAND_LABEL[card.brand]}</dd></div>
          <div className="pcx-row"><dt>Número</dt><dd>{masked(card.last4)}</dd></div>
          <div className="pcx-row"><dt>Titular</dt><dd>{card.holder}</dd></div>
          <div className="pcx-row"><dt>Validade</dt><dd>{card.expiry}</dd></div>
          <div className="pcx-row"><dt>Limite</dt><dd>{fmtBRL(card.limit)}</dd></div>
          <div className="pcx-row">
            <dt>Fatura atual</dt>
            <dd className={card.invoice > 0 ? 'pcx-neg' : 'pcx-pos'}>{fmtBRL(card.invoice)}</dd>
          </div>
          <div className="pcx-row"><dt>Vencimento</dt><dd>{card.due}</dd></div>
          <div className="pcx-row"><dt>Parcelas</dt><dd>{card.installments > 0 ? `${card.installments}x` : '—'}</dd></div>
        </dl>
        <div className="pcx-actions">
          <button
            type="button"
            className="pcx-btn pcx-btn--ghost"
            onClick={() => onAction({ type: 'suggest_transition', toStepId: 'fatura' })}
          >
            Sugerir Fatura
          </button>
          <button
            type="button"
            className="pcx-btn pcx-btn--primary"
            onClick={() => onAction({ type: 'context_update', updates: { invoice_status: 'paga', selected_card: card.id } })}
          >
            Registrar pagamento
          </button>
        </div>
      </div>
      {otherCtx.length > 0 && (
        <div className="pcx-context">
          <p className="pcx-context__title">Contexto acumulado</p>
          <div className="pcx-chips">
            {otherCtx.map(([key, value]) => (
              <span key={key} className="pcx-chipctx">{key}={value}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
