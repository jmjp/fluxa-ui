'use client';

import type { PluginPanelProps } from '@fluxa/plugin-sdk';

const cards = [
  { id: 'ana-001', customer: 'Ana', label: 'Visa final 1234' },
  { id: 'bob-002', customer: 'Bob', label: 'Mastercard final 5678' },
];

/** Painel principal com cartões fictícios para validar a integração. */
export function CartoesMain({ conversationId, onAction }: PluginPanelProps) {
  return (
    <section>
      <h2>Cartões</h2>
      <p>Conversa: {conversationId}</p>
      <ul>
        {cards.map((card) => (
          <li key={card.id}>
            <strong>{card.customer}</strong> — {card.label}
            <button
              type="button"
              onClick={() => onAction({ type: 'context_update', updates: { selected_card: card.id } })}
            >
              Selecionar cartão
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
