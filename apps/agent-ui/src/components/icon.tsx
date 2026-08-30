import { cn } from '@fluxa/ui';

/**
 * Ícone do design system (Material Symbols Outlined).
 * `fill` define o estado "preenchido" (FILL 1). O nome é o ligature,
 * ex.: <Icon name="inbox" /> → INBOX.
 */
export function Icon({
  name,
  className,
  fill,
}: {
  name: string;
  className?: string;
  fill?: boolean;
}) {
  return (
    <span aria-hidden className={cn('material-symbols-outlined leading-none', fill && 'fill', className)}>
      {name}
    </span>
  );
}
