import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface SectionProps extends HTMLAttributes<HTMLElement> {
  id?: string;
  hasBackground?: boolean;
}

export const Section = forwardRef<HTMLDivElement, SectionProps>(
  ({ id, hasBackground = false, className, children, ...props }, ref) => {
    return (
      <section
        id={id}
        ref={ref}
        className={cn(
          'py-12 md:py-20 relative w-full overflow-hidden',
          hasBackground && 'bg-surface border-y border-border',
          className
        )}
        {...props}
      >
        {children}
      </section>
    );
  }
);
Section.displayName = 'Section';
