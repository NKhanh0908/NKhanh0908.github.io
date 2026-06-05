import { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface ParagraphProps extends HTMLAttributes<HTMLParagraphElement> {
  size?: 'body' | 'small';
}

export function Paragraph({ size = 'body', className, children, ...props }: ParagraphProps) {
  return (
    <p
      className={cn(
        'text-secondary-text leading-relaxed font-sans',
        size === 'body' && 'text-[clamp(1rem,1.5vw,1.125rem)]',
        size === 'small' && 'text-sm',
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
}
