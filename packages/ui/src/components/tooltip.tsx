import * as React from 'react';
import { cn } from '../lib/utils';

export function Tooltip({ content, children, className }: { content: React.ReactNode; children: React.ReactNode; className?: string }) {
  return <span className={cn('group relative inline-flex', className)}>{children}<span role="tooltip" className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 w-max max-w-48 -translate-x-1/2 rounded-md bg-foreground px-2 py-1 text-xs text-background opacity-0 shadow transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">{content}</span></span>;
}
