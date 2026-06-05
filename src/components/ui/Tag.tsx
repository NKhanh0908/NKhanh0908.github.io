import { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export function Tag({ className, children, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-3 py-1 rounded-md text-xs font-mono bg-background border border-border text-secondary-text transition-colors hover:border-accent hover:text-accent',
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
