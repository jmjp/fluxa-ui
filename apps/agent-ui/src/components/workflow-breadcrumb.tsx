import { Icon } from './icon';
import { WORKFLOW_STEPS } from '@/lib/ui';

/** Breadcrumb de progresso do workflow (Triagem→Cartões→Fatura→Avaliação), estilo do protótipo. */
export function WorkflowBreadcrumb({ currentStepId }: { currentStepId?: string }) {
  const active = Math.max(0, WORKFLOW_STEPS.findIndex((step) => step.id === currentStepId));

  return (
    <nav aria-label="Etapas do workflow" className="flex items-center gap-1.5 overflow-x-auto whitespace-nowrap">
      {WORKFLOW_STEPS.map((step, index) => (
        <span key={step.id} className="flex items-center gap-1.5">
          {index > 0 && <Icon name="chevron_right" className="text-[12px] text-surface-border" />}
          {index === active ? (
            <span className="flex items-center gap-1 rounded-md bg-accent-soft px-2 py-0.5 text-[12px] font-semibold text-primary">
              <Icon name={step.icon} className="text-[14px]" />
              {step.label}
            </span>
          ) : (
            <span
              className={
                index < active
                  ? 'flex items-center gap-1 text-[12px] text-on-surface'
                  : 'flex items-center gap-1 text-[12px] text-outline'
              }
            >
              <Icon name={index < active ? 'check_circle' : step.icon} className="text-[14px]" />
              {step.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  );
}
