/**
 * Estilo auto-contido do plugin de cartões.
 *
 * Os painéis são carregados como bundle ESM remoto dentro do Agent UI, então o
 * Tailwind do host NÃO alcança o markup do plugin. Para a interface aparecer
 * igual no preview (:3002) e embutida, o CSS viaja dentro do próprio JS do
 * bundle, via `<style>{PCX_CSS}</style>`, escopado sob `.pcx`.
 */
export const PCX_CSS = `
.pcx { font-family: Inter, ui-sans-serif, system-ui, -apple-system, sans-serif; color: #191c1e; line-height: 1.4; }
.pcx *, .pcx *::before, .pcx *::after { box-sizing: border-box; }

/* Cabeçalho */
.pcx-head { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 6px; }
.pcx-title { font-size: 17px; font-weight: 700; letter-spacing: -0.01em; margin: 0; }
.pcx-sub { font-size: 12px; color: #434655; margin: 0 0 16px; }

/* Grade de cartões */
.pcx-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 16px; }

/* Viso do cartão */
.pcx-card { position: relative; border-radius: 16px; padding: 18px 18px 16px; color: #fff; overflow: hidden; cursor: pointer; box-shadow: 0 8px 20px rgba(15,23,42,.16); transition: transform .15s ease, box-shadow .15s ease, outline-color .15s ease; min-height: 156px; outline: 3px solid transparent; outline-offset: 3px; }
.pcx-card:hover { transform: translateY(-2px); box-shadow: 0 12px 26px rgba(15,23,42,.2); }
.pcx-card--selected { outline-color: #004ac6; }
.pcx-card--visa { background: linear-gradient(140deg, #1f2a44, #2a3f6f 55%, #3b6bb0); }
.pcx-card--mastercard { background: linear-gradient(140deg, #26262b, #3a3a4a 55%, #5b21b6); }
.pcx-card--elo { background: linear-gradient(140deg, #2b3d2f, #10403c 55%, #0e7490); }
.pcx-card--amex { background: linear-gradient(140deg, #0f3d3e, #155e63 55%, #2b7a78); }
.pcx-card__top { display: flex; justify-content: space-between; align-items: flex-start; gap: 10px; }
.pcx-card__brand { font-size: 12px; font-weight: 700; letter-spacing: .04em; text-transform: uppercase; opacity: .95; }
.pcx-chip { width: 34px; height: 25px; border-radius: 5px; background: linear-gradient(135deg, #f6e27a, #f4c430); border: 1px solid rgba(0,0,0,.18); position: relative; }
.pcx-chip::after { content: ''; position: absolute; inset: 5px; border-radius: 3px; border: 1px solid rgba(0,0,0,.12); }
.pcx-card__num { font-family: 'JetBrains Mono', ui-monospace, SFMono-Regular, monospace; font-size: 16px; letter-spacing: .12em; margin: 18px 0 16px; }
.pcx-card__bottom { display: flex; justify-content: space-between; gap: 12px; }
.pcx-card__bottom > div { min-width: 0; }
.pcx-lbl { display: block; font-size: 9px; text-transform: uppercase; letter-spacing: .08em; opacity: .72; margin-bottom: 2px; }
.pcx-val { font-size: 12px; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

/* Selo de status */
.pcx-status { display: inline-flex; align-items: center; gap: 5px; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: .05em; padding: 3px 8px; border-radius: 999px; }
.pcx-status::before { content: ''; width: 6px; height: 6px; border-radius: 50%; background: currentColor; }
.pcx-status--ativa { background: rgba(16,185,129,.18); color: #6ee7b7; }
.pcx-status--atrasada { background: rgba(245,158,11,.2); color: #fcd34d; }
.pcx-status--bloqueada { background: rgba(239,68,68,.2); color: #fca5a5; }

/* Painel de detalhes (sidebar) */
.pcx-detail { background: #fff; border: 1px solid #e2e8f0; border-radius: 14px; padding: 16px; }
.pcx-detail__title { font-size: 13px; font-weight: 700; margin: 0 0 12px; }
.pcx-rows { display: grid; grid-template-columns: 1fr; gap: 0; margin: 0; }
.pcx-row { display: flex; justify-content: space-between; gap: 12px; padding: 9px 0; border-bottom: 1px solid #eef1f4; }
.pcx-row:last-child { border-bottom: 0; }
.pcx-row dt { color: #434655; font-size: 12px; }
.pcx-row dd { margin: 0; font-weight: 600; font-size: 12px; text-align: right; }
.pcx-row dd.pcx-pos { color: #059669; }
.pcx-row dd.pcx-neg { color: #dc2626; }

/* Contexto acumulado */
.pcx-context { margin-top: 14px; }
.pcx-context__title { font-size: 11px; text-transform: uppercase; letter-spacing: .06em; color: #737686; margin: 0 0 8px; }
.pcx-chips { display: flex; flex-wrap: wrap; gap: 6px; }
.pcx-chipctx { font-size: 11px; background: #eef2f7; color: #334155; border: 1px solid #e2e8f0; border-radius: 999px; padding: 4px 10px; }

/* Ações */
.pcx-actions { display: flex; gap: 8px; margin-top: 14px; flex-wrap: wrap; }
.pcx-btn { font-weight: 600; font-size: 12px; padding: 8px 14px; border-radius: 10px; border: 1px solid transparent; cursor: pointer; transition: background .15s ease; }
.pcx-btn--primary { background: #004ac6; color: #fff; }
.pcx-btn--primary:hover { background: #003ea8; }
.pcx-btn--ghost { background: #fff; border-color: #e2e8f0; color: #004ac6; }
.pcx-btn--ghost:hover { background: #f2f6fb; }

@media (max-width: 520px) { .pcx-grid { grid-template-columns: 1fr; } }
`;
