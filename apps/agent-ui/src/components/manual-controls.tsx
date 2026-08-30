'use client';
import { stepLabel } from '@/lib/ui';

/** Transição manual exibida no rodapé do painel de contexto (estilo do protótipo). */
export function ManualControls({
  steps,
  currentStepId,
  onTransition,
}: {
  steps: string[];
  currentStepId?: string;
  onTransition: (id: string) => void;
}) {
  const index = Math.max(0, currentStepId ? steps.indexOf(currentStepId) : 0);
  const next = steps[index + 1];

  return (
    <div className="flex flex-col gap-2">
      <select
        aria-label="Transição manual"
        value=""
        onChange={(event) => event.target.value && onTransition(event.target.value)}
        className="w-full rounded-lg border border-surface-border bg-surface-container-lowest px-3 py-2 text-[12.5px] text-on-surface focus:border-primary focus:outline-none"
      >
        <option value="">Ir para etapa…</option>
        {steps
          .filter((step) => step !== currentStepId)
          .map((step) => (
            <option key={step} value={step}>
              {stepLabel(step)}
            </option>
          ))}
      </select>
      <button
        type="button"
        disabled={!next || next === currentStepId}
        onClick={() => next && onTransition(next)}
        className="w-full rounded-lg bg-primary py-2 text-[12.5px] font-medium text-on-primary transition-colors hover:bg-primary-container disabled:opacity-50"
      >
        Mudar para a próxima etapa
      </button>
    </div>
  );
}
