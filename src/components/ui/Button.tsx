import * as React from 'react';
import { cn } from '@/utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'outline';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', ...props }, ref) => {
        return (
        <button ref={ref}
            className={cn(
            'outline-none focus:outline-none focus:ring-0 focus:ring-transparent focus-visible:outline-none ring-0 active:outline-none',
            'inline-flex items-center justify-center rounded-full font-sans font-medium tracking-widest uppercase transition-all duration-500 disabled:opacity-50 disabled:pointer-events-none px-6 py-3 text-xs',
            {
                'bg-gradient-to-r from-luxury-bronze via-luxury-gold to-luxury-bronze text-stone-900 shadow-md hover:shadow-luxury-gold/30 hover:scale-[1.02] active:scale-[0.98]':
                variant === 'primary',
                'border border-luxury-gold/40 text-luxury-bronze hover:bg-luxury-gold/10':
                variant === 'outline',
            },
            className
            )}
            {...props}
        />
        );
    }
);
Button.displayName = 'Button';