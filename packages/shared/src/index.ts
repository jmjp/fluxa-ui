/**
 * Tipos compartilhados Agent UI + Admin UI.
 *
 * Espelham (mas são independentes) as entities de domínio do core
 * (`fluxa/internal/core/entities`). Mantemos em paralelo porque:
 * 1. Core é Go; UI é TypeScript — não dá pra compartilhar diretamente.
 * 2. UI pode ter campos derivados que o backend não precisa.
 * 3. Mudanças de schema no core viram PR neste pacote também (manual sync).
 */
export * from './types/workflow';
export * from './types/conversation';
export * from './types/plugin';
export * from './types/agent';
export * from './types/queue';
export * from './types/common';
export * as api from './api/client';
