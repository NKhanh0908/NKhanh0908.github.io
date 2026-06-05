import { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export function Divider({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('h-[1px] w-full bg-border my-6', className)} {...props} />;
}
