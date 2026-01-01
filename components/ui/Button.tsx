import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline';
    children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
    variant = 'primary',
    children,
    className = '',
    ...props
}) => {
    const baseStyles = 'px-4 py-2 rounded-lg font-medium transition-colors';
    const variantStyles = {
        primary: 'bg-red-600 text-white hover:bg-red-700',
        secondary: 'bg-amber-600 text-white hover:bg-amber-700',
        outline: 'border-2 border-red-600 text-red-600 hover:bg-red-50',
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
