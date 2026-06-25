import React, { ButtonHTMLAttributes } from 'react';
import styles from './Button.module.css';

type Variant = 'primary' | 'danger' | 'success' | 'ghost' | 'outline' | 'amber';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: Variant;
    size?: Size;
}

export default function Button({
                                   variant = 'primary',
                                   size = 'md',
                                   className,
                                   children,
                                   ...rest
                               }: ButtonProps) {
    const cls = [styles.btn, styles[variant], styles[size], className]
        .filter(Boolean)
        .join(' ');

    return (
        <button className={cls} {...rest}>
            {children}
        </button>
    );
}