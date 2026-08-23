import { Check, Circle } from 'lucide-react';

export function WorkflowBreadcrumb({ steps, currentStepId }: { steps: string[]; currentStepId?: string }) {
  const active = Math.max(0, currentStepId ? steps.indexOf(currentStepId) : 0);
  return <nav aria-label="Etapas do workflow" className="flex items-center gap-2 overflow-x-auto text-xs">
    {steps.map((step, index) => <div key={step} className="flex items-center gap-2 whitespace-nowrap">
      {index > 0 && <span className="text-muted-foreground">→</span>}
      {index < active ? <Check className="size-3 text-emerald-600" /> : <Circle className="size-3" />}
      <span className={index === active ? 'font-semibold text-primary' : 'text-muted-foreground'}>{step}</span>
    </div>)}
  </nav>;
}
