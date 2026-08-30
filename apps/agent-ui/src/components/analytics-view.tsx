'use client';

import { cn } from '@fluxa/ui';

/** Painel "Volume por canal" — barras horizontais (estilo do protótipo). */
function BarRow({ label, value, width, muted = false }: { label: string; value: string; width: string; muted?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-[72px] shrink-0 text-[12px] text-on-surface">{label}</span>
      <div className="h-[10px] flex-1 overflow-hidden rounded-full bg-surface-container-high">
        <div className={cn('h-full rounded-full', muted ? 'bg-on-surface-variant' : 'bg-primary')} style={{ width }} />
      </div>
      <span className="w-11 shrink-0 text-right font-code-sm text-[12px]">{value}</span>
    </div>
  );
}

/** Painel "Volume nos últimos 7 dias" — mini-barras (estilo do protótipo). */
const WEEK = [
  { day: 'Seg', h: '46%' },
  { day: 'Ter', h: '62%' },
  { day: 'Qua', h: '54%' },
  { day: 'Qui', h: '78%' },
  { day: 'Sex', h: '88%', hi: true },
  { day: 'Sáb', h: '70%' },
  { day: 'Dom', h: '64%' },
];

export function AnalyticsView() {
  return (
    <div className="h-full overflow-auto bg-background px-7 py-6">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-[24px] font-bold leading-tight tracking-tight text-on-surface">Desempenho do atendimento</h1>
          <p className="mt-1 text-[13px] text-outline">Dados das últimas 24 horas em todos os canais.</p>
        </div>
        <span className="font-code-sm text-[11px] text-outline">Atualizado agora</span>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.6fr_1fr]">
        {/* Volume por canal */}
        <div className="rounded-xl border border-surface-border bg-surface-container-lowest p-[18px]">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-[15px] font-semibold text-on-surface">Volume por canal</h2>
            <span className="font-code-sm text-[11px] text-outline">Conversas atendidas</span>
          </div>
          <div className="flex flex-col gap-3.5">
            <BarRow label="WhatsApp" value="312" width="78%" />
            <BarRow label="Webchat" value="224" width="56%" muted />
            <BarRow label="Telegram" value="128" width="32%" muted />
          </div>
        </div>

        {/* Volume nos últimos 7 dias */}
        <div className="rounded-xl border border-surface-border bg-surface-container-lowest p-[18px]">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-[15px] font-semibold text-on-surface">Volume nos últimos 7 dias</h2>
            <span className="font-code-sm text-[11px] text-outline">Conversas/dia</span>
          </div>
          <div className="flex h-[120px] items-end gap-1.5">
            {WEEK.map((d) => (
              <div key={d.day} className={cn('flex-1 rounded-t bg-surface-variant', d.hi && 'bg-primary')} style={{ height: d.h }} />
            ))}
          </div>
          <div className="mt-1.5 flex gap-1.5">
            {WEEK.map((d) => (
              <span key={d.day} className="flex-1 text-center font-code-sm text-[10px] text-outline">
                {d.day}
              </span>
            ))}
          </div>
        </div>

        {/* Resolução por estado */}
        <div className="rounded-xl border border-surface-border bg-surface-container-lowest p-[18px] lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-[15px] font-semibold text-on-surface">Resolução por estado</h2>
            <span className="font-code-sm text-[11px] text-outline">última semana</span>
          </div>
          <div className="flex flex-col gap-3.5">
            <BarRow label="Resolvidas" value="664" width="82%" />
            <BarRow label="Em aberto" value="118" width="40%" muted />
          </div>
        </div>
      </div>
    </div>
  );
}
