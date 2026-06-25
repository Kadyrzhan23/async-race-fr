import React, { useState } from 'react';
import Input from '../Input';
import ColorPicker from '../ColorPicker';
import Button from '../Button';
import styles from './EditCarPanel.module.css';
import type { Car } from '../../types';

interface EditCarPanelProps {
    car: Car | null;
    onSave: (id: number, name: string, color: string) => void;
    onCancel: () => void;
}

export default function EditCarPanel({ car, onSave, onCancel }: EditCarPanelProps) {
    const [name, setName] = useState(car?.name ?? '');
    const [color, setColor] = useState(car?.color ?? '#e8eaf0');

    if (!car) return null;

    return (
        <div className={styles.panel}>
            <Input
                placeholder="Car name"
                value={name}
                onChange={e => setName(e.target.value)}
            />
            <ColorPicker value={color} onChange={e => setColor(e.target.value)} />
            <Button onClick={() => onSave(car.id, name.trim(), color)} disabled={!name.trim()}>
                Save
            </Button>
            <Button variant="ghost" onClick={onCancel}>
                Cancel
            </Button>
        </div>
    );
}