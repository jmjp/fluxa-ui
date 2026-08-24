'use client';

import { Component, type ReactNode } from 'react';

export class ErrorBoundary extends Component<
  { children: ReactNode; fallback?: ReactNode },
  { error?: Error }
> {
  override state = { error: undefined as Error | undefined };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  override componentDidCatch(error: Error, info: { componentStack: string }) {
    console.error('Inbox crashed:', error, info.componentStack);
  }

  override render() {
    if (this.state.error) {
      return (
        <div className="rounded border border-destructive p-4 text-sm text-destructive">
          Erro ao carregar Agent UI. Tente <a href=".">recarregar</a> ou abra em{' '}
          <kbd>Ctrl+Shift+R</kbd>.
          <pre className="mt-2 text-xs">{String(this.state.error)}</pre>
        </div>
      );
    }

    return this.props.children;
  }
}
