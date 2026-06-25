import React, { InputHTMLAttributes } from 'react';
import styles from './ColorPicker.module.css';

interface ColorPickerProps extends InputHTMLAttributes<HTMLInputElement> {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ColorPicker({ value, onChange, ...rest }: ColorPickerProps) {
  return (
      <label className={styles.wrapper}>
        <span className={styles.preview} style={{ background: value }} />
        <input
            type="color"
            value={value}
            onChange={onChange}
            className={styles.input}
            {...rest}
        />
      </label>
  );
}