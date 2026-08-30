/**
 * Modelo e dados fictícios exibidos pelo plugin de chat.
 *
 * Reproduz fielmente a conversa canônica do protótipo `fluxa-chat-widget.html`:
 * o cliente inicia a conversa (voz "out", bolha direita/accent) e digita pelo
 * composer; a Fluxa (atendente) responde automaticamente (voz "in", bolha
 * esquerda/surface) com a ficha do pedido e a sugestão de pagamento, até
 * resolver o atendimento.
 */

/** Lado que produz a mensagem: 'client' à direita (accent) · 'agent' à esquerda (surface). */
export type Side = 'client' | 'agent';

/** Bloco de mensagem de texto. */
export interface ChatLine {
  side: Side;
  text: string;
}

/** Ficha de pedido exibida como cartão rico no meio da thread. */
export interface Order {
  number: string;
  item: string;
  pay: string;
  status: string;
  total: string;
}

/** Pedido identificado na conversa (mesmo do protótipo). */
export const DEMO_ORDER: Order = {
  number: 'FLX-4821',
  item: 'Estante Ordem',
  pay: 'Cartão final 4482',
  status: 'Aguardando 1ª parcela',
  total: 'R$ 189,00',
};

/** Mensagem do cliente que abre o atendimento (voz "out", direita/accent). */
export const START_CLIENT: ChatLine = {
  side: 'client',
  text: 'Oi! Preciso de ajuda com a Estante Ordem que comprei na semana passada.',
};

/** Falas da Fluxa (atendente) — voz "in", esquerda/surface. */
export const AGENT_TURNS = {
  greeting:
    'Olá! Prazer, aqui é a Fluxa. Já identifiquei seu pedido — consigo ver os detalhes por aqui. Um momento que confiro o pagamento.',
  invoiceQuestion:
    'A primeira parcela de R$ 189,00 ainda não foi confirmada na sua fatura. Quer que eu gere um link de pagamento para você quitar agora?',
  pixConfirmation:
    'Perfeito! Gerei um pagamento por PIX com validade de 15 minutos. Assim que confirmar, a parcela sai da fatura automaticamente.',
  wrapUp: 'Ainda preciso de mais alguma coisa? Se não, considero seu atendimento encerrado.',
  askForOrder:
    'Entendi. Pode me passar o número do pedido ou o e-mail usado na compra, que eu localizo para você na hora.',
  linkSent:
    'Link de pagamento gerado e enviado para você. É só confirmar no seu app do banco.',
  ratingThanks:
    'Obrigado pela avaliação! Se precisar, é só chamar por aqui. Até já.',
} as const;

/** Intenção de pagamento disparada pelo cliente (mesma regex do protótipo). */
export const PAYMENT_INTENT = /pagar|quitar|link|bora|sim|ok|pix|cartão|cartao/i;

/** Hora local como HH:MM (para os timestamps da thread). */
export function now(): string {
  const t = new Date();
  return `${String(t.getHours()).padStart(2, '0')}:${String(t.getMinutes()).padStart(2, '0')}`;
}
