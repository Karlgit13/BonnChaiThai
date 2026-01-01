import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'gold' | 'ghost';
    children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
    variant = 'primary',
    children,
    className = '',
    ...props
}) => {
    const baseStyles = 'px-6 py-3 rounded-sm font-sans uppercase tracking-[0.2em] text-xs transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed';

    const variantStyles = {
        primary: 'bg-white text-black hover:bg-zinc-200',
        secondary: 'bg-zinc-800 text-white hover:bg-zinc-700',
        outline: 'border border-zinc-700 text-white hover:border-gold hover:text-gold',
        gold: 'bg-gold-light text-black hover:bg-gold font-bold',
        ghost: 'text-zinc-400 hover:text-white bg-transparent',
    };

    return (
        <button
            className={`${baseStyles} ${variantStyles[variant]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};
