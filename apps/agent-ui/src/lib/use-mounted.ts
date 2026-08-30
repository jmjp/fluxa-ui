'use client';
import { useEffect, useState } from 'react';

/**
 * Retorna `false` no primeiro render (SSR e hidratação) e `true` após montar
 * no client. Use para renderizar apenas no client valores dependentes de
 * `Date.now()` (tempo de espera, relógio, "x min atrás") — evita hydration
 * mismatch, já que o servidor e o cliente computariam valores diferentes e o
 * React regeneraria a árvore no cliente.
 */
export function useMounted(): boolean {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}
