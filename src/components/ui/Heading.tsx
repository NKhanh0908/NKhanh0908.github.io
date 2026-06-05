import { ElementType, HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  as?: ElementType;
  level?: 1 | 2 | 3 | 4;
}

export function Heading({ as, level = 2, className, children, ...props }: HeadingProps) {
  const Tag = as || (`h${level}` as ElementType);

  const classes = cn(
    'text-primary-text font-sans font-bold tracking-tight',
    level === 1 && 'text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.1] font-extrabold',
    level === 2 && 'text-[clamp(1.75rem,4vw,3rem)] leading-[1.2]',
    level === 3 && 'text-xl md:text-2xl leading-snug',
    level === 4 && 'text-lg leading-normal',
    className
  );

  return (
    <Tag className={classes} {...props}>
      {children}
    </Tag>
  );
}
