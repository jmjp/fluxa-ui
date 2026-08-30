'use client';

import type { PluginPanelProps } from '@fluxa/plugin-sdk';
import { BRAND_LABEL, DEMO_CARDS, fmtBRL, masked } from './cards-data';
import { PCX_CSS } from './pcx.css';

/**
 * Painel principal: grade de cartões do cliente. Selecionar um cartão dispara
 * `context_update` com `selected_card`, que o painel lateral (sidebar) usa pra
 * exibir os dados.
 */
export function CartoesMain({ conversationId, context, onAction }: PluginPanelProps) {
  const selected = context.selected_card;
  return (
    <div className="pcx">
      <style>{PCX_CSS}</style>
      <div className="pcx-head">
        <h2 className="pcx-title">Cartões do cliente</h2>
      </div>
      <p className="pcx-sub">Conversa {conversationId} · selecione um cartão para inspecionar os dados.</p>
      <div className="pcx-grid">
        {DEMO_CARDS.map((card) => {
          const isSelected = selected === card.id;
          const select = () => onAction({ type: 'context_update', updates: { selected_card: card.id } });
          return (
            <article
              key={card.id}
              className={`pcx-card pcx-card--${card.brand}${isSelected ? ' pcx-card--selected' : ''}`}
              onClick={select}
              role="button"
              tabIndex={0}
              aria-pressed={isSelected}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') select();
              }}
            >
              <div className="pcx-card__top">
                <span className="pcx-card__brand">{BRAND_LABEL[card.brand]}</span>
                <span className={`pcx-status pcx-status--${card.status}`}>{card.status}</span>
              </div>
              <div className="pcx-chip" />
              <div className="pcx-card__num">{masked(card.last4)}</div>
              <div className="pcx-card__bottom">
                <div>
                  <span className="pcx-lbl">titular</span>
                  <span className="pcx-val">{card.holder}</span>
                </div>
                <div>
                  <span className="pcx-lbl">validade</span>
                  <span className="pcx-val">{card.expiry}</span>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span className="pcx-lbl">limite</span>
                  <span className="pcx-val">{fmtBRL(card.limit)}</span>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
