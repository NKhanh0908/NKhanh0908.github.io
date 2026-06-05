import { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export function Badge({ className, children, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-accent/10 text-accent font-sans',
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
