import type * as ReactNS from 'react';

type ReactModule = typeof ReactNS;

/**
 * Chave do global no qual o host (Agent UI) publica o React para os painéis
 * remotos. O bundle ESM do plugin NÃO importa `react` (nem embute uma cópia):
 * o JSX é compilado para `globalThis.__FLUXA_REACT__.createElement(...)`. Assim
 * existe uma única instância de React — a do host — e não ocorre o erro clássico
 * de "multiple instances of React" na fronteira entre módulos.
 */
const REACT_BRIDGE_KEY = '__FLUXA_REACT__';

/** Registra o React do host. Deve ser chamado ANTES de carregar painéis remotos. */
export function setReactBridge(react: ReactModule): void {
  const globals = globalThis as unknown as Record<string, unknown>;
  globals[REACT_BRIDGE_KEY] = react;
}

/** Recupera o React do host (para tooling/instrumentação; painéis usam o global direto). */
export function getReactBridge(): ReactModule {
  const globals = globalThis as unknown as Record<string, unknown>;
  const react = globals[REACT_BRIDGE_KEY];
  if (!react) {
    throw new Error('React bridge não configurada. Chame setReactBridge no host antes de carregar painéis remotos.');
  }
  return react as ReactModule;
}
