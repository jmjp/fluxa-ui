'use client';
import { Icon } from './icon';

/** Banner "Sugestão do Assist" (estilo do protótipo): título, descrição e ação "Avancar". */
export function LLMSuggestionBanner({
  title = 'Sugestão do Assist',
  description,
  onApply,
}: {
  title?: string;
  description?: string;
  onApply: () => void;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-surface-border bg-surface-container-low px-3.5 py-3">
      <Icon name="auto_awesome" className="shrink-0 text-[18px] text-primary" />
      <div className="min-w-0 flex-1">
        <div className="text-[12.5px] font-semibold text-on-surface">{title}</div>
        {description && <div className="mt-0.5 text-[11.5px] text-outline">{description}</div>}
      </div>
      <button
        type="button"
        onClick={onApply}
        className="shrink-0 rounded-lg bg-primary px-2.5 py-1.5 text-[12px] font-medium text-on-primary transition-colors hover:bg-primary-container"
      >
        Avancar
      </button>
    </div>
  );
}
