'use client';
import { Button } from '@fluxa/ui';
export function ManualControls({ steps, currentStepId, onTransition }: { steps: string[]; currentStepId?: string; onTransition: (id: string) => void }) {
  const index = Math.max(0, currentStepId ? steps.indexOf(currentStepId) : 0);
  const previous = steps[index - 1]; const next = steps[index + 1];
  return <div className="flex flex-wrap items-center gap-2 border-t p-3">
    <Button size="sm" variant="outline" disabled={!previous} onClick={() => previous && onTransition(previous)}>← Voltar</Button>
    <select aria-label="Transição manual" className="rounded-md border bg-background px-2 py-1 text-sm" value="" onChange={(event) => event.target.value && onTransition(event.target.value)}>
      <option value="">Ir para etapa…</option>{steps.filter((step) => step !== currentStepId).map((step) => <option key={step} value={step}>{step}</option>)}
    </select>
    <Button size="sm" disabled={!next} onClick={() => next && onTransition(next)}>Avançar →</Button>
  </div>;
}
