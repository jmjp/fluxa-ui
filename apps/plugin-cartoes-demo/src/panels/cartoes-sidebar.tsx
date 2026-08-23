'use client';

import type { PluginPanelProps } from '@fluxa/plugin-sdk';

/** Painel lateral que torna o contexto do workflow inspecionável. */
export function CartoesSidebar({ context, onAction }: PluginPanelProps) {
  const entries = Object.entries(context);
  return (
    <aside>
      <h2>Contexto acumulado</h2>
      {entries.length ? <ul>{entries.map(([key, value]) => <li key={key}>{key}={value}</li>)}</ul> : <p>Sem contexto.</p>}
      <button type="button" onClick={() => onAction({ type: 'suggest_transition', toStepId: 'fatura' })}>
        Sugerir transição para fatura
      </button>
    </aside>
  );
}
