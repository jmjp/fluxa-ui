'use client';
import * as React from 'react';
import { cn } from '../lib/utils';

export function Toast({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div role="status" className={cn('rounded-lg border bg-card p-3 text-sm shadow-lg', className)} {...props}>{children}</div>;
}
