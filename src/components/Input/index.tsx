import React, { InputHTMLAttributes } from 'react';
import styles from './Input.module.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

export default function Input({ label, className, ...rest }: InputProps) {
    return (
        <div className={styles.wrapper}>
            {label && <label className={styles.label}>{label}</label>}
            <input className={[styles.input, className].filter(Boolean).join(' ')} {...rest} />
        </div>
    );
}