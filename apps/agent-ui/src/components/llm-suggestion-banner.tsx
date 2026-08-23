'use client';
import { Button } from '@fluxa/ui';
export function LLMSuggestionBanner({ intent, confidence, onApply }: { intent: string; confidence: number; onApply: () => void }) {
  return <div className="flex items-center justify-between gap-3 rounded-md border border-amber-300 bg-amber-50 p-3 text-sm text-amber-950">
    <span>LLM sugere: {intent} (confiança {confidence.toFixed(1)})</span><Button size="sm" onClick={onApply}>Aplicar</Button>
  </div>;
}
