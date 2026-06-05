import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center font-sans font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer',
          // Variants
          variant === 'primary' && 'bg-accent text-white hover:bg-accent/90 shadow-sm',
          variant === 'outline' && 'border border-border bg-transparent text-primary-text hover:bg-background hover:text-accent hover:border-accent',
          variant === 'ghost' && 'text-secondary-text hover:text-primary-text hover:bg-background',
          variant === 'link' && 'text-accent underline-offset-4 hover:underline bg-transparent p-0 h-auto',
          // Sizes (ensure height matches min 44px target)
          size === 'sm' && 'h-9 px-3 text-sm rounded-sm',
          size === 'md' && 'h-11 px-6 text-sm rounded-md',
          size === 'lg' && 'h-12 px-8 text-base rounded-lg',
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';
