/** Modelo e dados fictícios exibidos pelo plugin de cartões. */

export type CardType = 'visa' | 'mastercard' | 'elo' | 'amex';
export type CardStatus = 'ativa' | 'atrasada' | 'bloqueada';

export interface CardData {
  id: string;
  brand: CardType;
  last4: string;
  holder: string;
  expiry: string;
  status: CardStatus;
  limit: number;
  invoice: number;
  due: string;
  installments: number;
}

export const BRAND_LABEL: Record<CardType, string> = {
  visa: 'Visa',
  mastercard: 'Mastercard',
  elo: 'Elo',
  amex: 'Amex',
};

export const DEMO_CARDS: CardData[] = [
  { id: 'card-001', brand: 'visa', last4: '1234', holder: 'MARIA SOUZA', expiry: '09/27', status: 'ativa', limit: 4500, invoice: 1230.5, due: '10/09', installments: 1 },
  { id: 'card-002', brand: 'mastercard', last4: '5678', holder: 'MARIA SOUZA', expiry: '03/26', status: 'atrasada', limit: 7800, invoice: 3120.75, due: '05/09', installments: 3 },
  { id: 'card-003', brand: 'elo', last4: '9012', holder: 'MARIA SOUZA', expiry: '12/28', status: 'ativa', limit: 2100, invoice: 0, due: '—', installments: 0 },
];

/** Formata um valor numérico como moeda pt-BR (R$ 1.234,56). */
export function fmtBRL(value: number): string {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

/** Número mascarado exibido no viso do cartão. */
export function masked(last4: string): string {
  return `•••• •••• •••• ${last4}`;
}
