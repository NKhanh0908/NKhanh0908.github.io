import { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: 'container' | 'content';
}

export function Container({ size = 'container', className, children, ...props }: ContainerProps) {
  return (
    <div
      className={cn(
        'mx-auto w-full px-6 md:px-12',
        size === 'container' && 'max-w-[1280px]',
        size === 'content' && 'max-w-[720px]',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
