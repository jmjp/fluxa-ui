/**
 * Estilo auto-contido do plugin de chat.
 *
 * Port fiel do `fluxa-chat-widget.html`: mesmo palette oklch monocromático da
 * Central Omni-channel (estilo Linear/Vercel). Os painéis são carregados como
 * bundle ESM remoto dentro do Agent UI, então o Tailwind do host NÃO alcança o
 * markup do plugin — o CSS viaja dentro do próprio JS, via `<style>{FCW_CSS}</style>`,
 * escopado sob `.fcw`. Aqui o widget não é flutuante: é embutido no painel
 * (sem launcher, sem `position: fixed`), preenchendo a área da slot.
 */
export const FCW_CSS = `
/* ── tokens (idênticos ao protótipo) ─────────────────────────────────── */
.fcw {
  --bg:      oklch(98.6% 0.002 250);
  --surface: oklch(100% 0 0);
  --fg:      oklch(18% 0.008 250);
  --muted:   oklch(47% 0.01 250);
  --border:  oklch(90.5% 0.005 250);
  --accent:  oklch(18% 0.008 250);

  --accent-soft:  color-mix(in oklch, var(--accent) 8%, transparent);
  --accent-mid:   color-mix(in oklch, var(--accent) 30%, white);
  --accent-hover: oklch(31% 0.014 250);
  --fg-soft:      color-mix(in oklch, var(--fg) 6%, transparent);
  --online:       oklch(69% 0.16 152);

  --font-display: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
  --font-body:    'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
  --font-mono:    ui-monospace, 'SF Mono', 'JetBrains Mono', 'Cascadia Mono', Menlo, monospace;

  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: var(--bg);
  color: var(--fg);
  font-family: var(--font-body);
  font-size: 14px; line-height: 1.5;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
}
.fcw *, .fcw *::before, .fcw *::after { box-sizing: border-box; }
.fcw button { font: inherit; cursor: pointer; }
.fcw input, .fcw textarea { font: inherit; color: inherit; }
.fcw p { text-wrap: pretty; }
.fcw h1, .fcw h2, .fcw h3 { text-wrap: balance; margin: 0; }
.fcw :focus-visible { outline: 2px solid var(--accent-mid); outline-offset: 2px; border-radius: 6px; }
.fcw .fcw-num { font-family: var(--font-mono); font-variant-numeric: tabular-nums; }

/* ── panel (janela de chat embutida) ────────────────────────────────── */
.fcw-panel {
  flex: 1 1 auto;
  min-height: 0;
  height: clamp(460px, 66vh, 720px);
  display: flex; flex-direction: column; overflow: hidden;
  background: var(--bg);
  border: 1px solid var(--border); border-radius: 18px;
  box-shadow: 0 24px 70px color-mix(in oklch, var(--accent) 16%, transparent);
}

.fcw-head {
  display: flex; align-items: center; gap: 12px;
  padding: 14px 16px;
  background: var(--surface);
  border-bottom: 1px solid var(--border);
}
.fcw-brand-avatar {
  width: 40px; height: 40px; border-radius: 12px;
  display: grid; place-items: center;
  background: var(--accent); color: var(--surface);
  font-family: var(--font-display); font-size: 18px; font-weight: 700;
  letter-spacing: -0.02em;
}
.fcw-head-id { flex: 1 1 auto; min-width: 0; }
.fcw-head-id .fcw-name { font-family: var(--font-display); font-size: 15px; font-weight: 700; letter-spacing: -0.01em; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.fcw-head-id .fcw-status { display: flex; align-items: center; gap: 6px; color: var(--muted); font-size: 12px; }
.fcw-head-id .fcw-status .dot { width: 7px; height: 7px; border-radius: 50%; background: var(--online); }
.fcw-head-actions { display: flex; gap: 4px; }
.fcw-iconbtn {
  min-width: 40px; min-height: 34px;
  display: grid; place-items: center;
  border: 0; border-radius: 9px; background: transparent; color: var(--muted);
  transition: background 0.15s ease, color 0.15s ease;
}
.fcw-iconbtn:hover { background: var(--fg-soft); color: var(--fg); }
.fcw-iconbtn svg { width: 20px; height: 20px; }

/* ── thread ─────────────────────────────────────────────────────────── */
.fcw-thread {
  flex: 1 1 auto; overflow-y: auto; padding: 18px 16px 12px;
  display: flex; flex-direction: column; gap: 12px;
}
.fcw-day {
  align-self: center; padding: 4px 12px; border-radius: 999px;
  background: var(--surface); border: 1px solid var(--border);
  color: var(--muted); font-family: var(--font-mono); font-size: 10.5px;
}
.fcw-msg { max-width: 80%; display: flex; flex-direction: column; }
.fcw-msg.in  { align-self: flex-start; }
.fcw-msg.out { align-self: flex-end; align-items: flex-end; }
.fcw-msg .fcw-bubble { padding: 10px 13px; border-radius: 14px; font-size: 13.5px; line-height: 1.5; }
.fcw-msg.in  .fcw-bubble { background: var(--surface); border: 1px solid var(--border); border-top-left-radius: 4px; }
.fcw-msg.out .fcw-bubble { background: var(--accent); color: var(--surface); border-top-right-radius: 4px; }
.fcw-msg .fcw-when { margin-top: 4px; color: var(--muted); font-family: var(--font-mono); font-size: 10px; }
.fcw-card-msg .fcw-bubble { width: 100%; padding: 0; overflow: hidden; }
.fcw-card { width: 100%; background: var(--surface); border: 1px solid var(--border); border-radius: 14px; overflow: hidden; }
.fcw-card-top { background: var(--accent); color: var(--surface); padding: 12px 14px; }
.fcw-card-top .fcw-kicker { font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.08em; text-transform: uppercase; opacity: 0.78; }
.fcw-card-top .fcw-card-title { font-family: var(--font-display); font-size: 15px; font-weight: 700; letter-spacing: -0.01em; margin-top: 2px; }
.fcw-card-body { padding: 14px; display: flex; flex-direction: column; gap: 10px; }
.fcw-card-row { display: flex; justify-content: space-between; gap: 12px; font-size: 13px; }
.fcw-card-row .fcw-k { color: var(--muted); }
.fcw-card-row .fcw-v { font-family: var(--font-mono); font-size: 12.5px; font-variant-numeric: tabular-nums; text-align: right; }
.fcw-card-row.total .fcw-v { font-size: 15px; font-weight: 600; }
.fcw-card-body hr { border: 0; border-top: 1px solid var(--border); margin: 0; }
.fcw-card-btn {
  width: 100%; padding: 11px; border: 1px solid var(--accent); border-radius: 9px;
  background: var(--accent); color: var(--surface); font-weight: 600;
  transition: background 0.15s ease;
}
.fcw-card-btn:hover { background: var(--accent-hover); }
.fcw-card-btn.secondary { background: transparent; color: var(--accent); }
.fcw-card-btn.secondary:hover { background: var(--accent-soft); }

/* ── typing indicator ───────────────────────────────────────────────── */
.fcw-typing { display: inline-flex; gap: 4px; padding: 12px 15px; background: var(--surface); border: 1px solid var(--border); border-radius: 14px; border-top-left-radius: 4px; }
.fcw-typing span { width: 6px; height: 6px; border-radius: 50%; background: var(--muted); animation: fcw-blink 1.2s ease-in-out infinite; }
.fcw-typing span:nth-child(2) { animation-delay: 0.18s; }
.fcw-typing span:nth-child(3) { animation-delay: 0.36s; }
@keyframes fcw-blink { 0%, 80%, 100% { opacity: 0.3; } 40% { opacity: 1; } }
.fcw-hidden { display: none !important; }

/* ── composer ───────────────────────────────────────────────────────── */
.fcw-composer { padding: 12px 14px 16px; border-top: 1px solid var(--border); background: var(--surface); }
.fcw-composer-box { display: flex; align-items: flex-end; gap: 8px; padding: 8px 8px 8px 13px; border: 1px solid var(--border); border-radius: 14px; background: var(--surface); transition: border-color 0.15s ease, box-shadow 0.15s ease; }
.fcw-composer-box:focus-within { border-color: var(--accent-mid); box-shadow: 0 0 0 3px var(--accent-soft); }
.fcw-composer-box textarea { flex: 1 1 auto; border: 0; resize: none; background: transparent; font-size: 13.5px; line-height: 1.45; max-height: 96px; padding: 6px 0; }
.fcw-composer-box textarea:focus { outline: none; }
.fcw-send { min-width: 36px; min-height: 36px; flex: 0 0 auto; display: grid; place-items: center; border: 0; border-radius: 9px; background: var(--accent); color: var(--surface); transition: background 0.15s ease, opacity 0.15s ease; }
.fcw-send:hover { background: var(--accent-hover); }
.fcw-send:disabled { opacity: 0.4; cursor: default; }
.fcw-send svg { width: 18px; height: 18px; }

/* ── rating footer ──────────────────────────────────────────────────── */
.fcw-rating { padding: 12px 14px; border-top: 1px solid var(--border); background: var(--surface); display: flex; flex-direction: column; gap: 10px; }
.fcw-rating-title { font-size: 13px; font-weight: 600; }
.fcw-stars { display: flex; gap: 6px; }
.fcw-star { min-width: 38px; min-height: 38px; display: grid; place-items: center; border: 1px solid var(--border); border-radius: 9px; background: transparent; color: var(--muted); transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease; }
.fcw-star:hover { background: var(--fg-soft); color: var(--fg); }
.fcw-star.sel { background: var(--accent); border-color: var(--accent); color: var(--surface); }
.fcw-star svg { width: 17px; height: 17px; }

/* ── sidebar / contexto (agent) ─────────────────────────────────────── */
.fcw-detail__title { font-size: 13px; font-weight: 700; margin: 0 0 12px; }
.fcw-rows { display: grid; grid-template-columns: 1fr; gap: 0; margin: 0; }
.fcw-row { display: flex; justify-content: space-between; gap: 12px; padding: 9px 0; border-bottom: 1px solid var(--border); }
.fcw-row:last-child { border-bottom: 0; }
.fcw-row dt { color: var(--muted); font-size: 12px; }
.fcw-row dd { margin: 0; font-weight: 600; font-size: 12px; text-align: right; }
.fcw-actions { display: flex; gap: 8px; margin-top: 14px; flex-wrap: wrap; }
.fcw-btn { font-weight: 600; font-size: 12px; padding: 8px 14px; border-radius: 10px; border: 1px solid transparent; cursor: pointer; transition: background 0.15s ease; }
.fcw-btn--primary { background: var(--accent); color: var(--surface); }
.fcw-btn--primary:hover { background: var(--accent-hover); }
.fcw-btn--ghost { background: var(--surface); border-color: var(--border); color: var(--accent); }
.fcw-btn--ghost:hover { background: var(--fg-soft); }
.fcw-context { margin-top: 14px; }
.fcw-context__title { font-size: 11px; text-transform: uppercase; letter-spacing: 0.06em; color: var(--muted); margin: 0 0 8px; }
.fcw-chips { display: flex; flex-wrap: wrap; gap: 6px; }
.fcw-chipctx { font-size: 11px; background: var(--fg-soft); color: var(--fg); border: 1px solid var(--border); border-radius: 999px; padding: 4px 10px; font-family: var(--font-mono); }

@media (max-width: 480px) {
  .fcw-msg { max-width: 92%; }
}
`;
