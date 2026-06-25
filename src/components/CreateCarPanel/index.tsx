import React, { useState } from 'react';
import Input from '../Input';
import ColorPicker from '../ColorPicker';
import Button from '../Button';
import styles from './CarPanel.module.css';

interface CreateCarPanelProps {
    onCreate: (name: string, color: string) => void;
}

export default function CreateCarPanel({ onCreate }: CreateCarPanelProps) {
    const [name, setName] = useState('');
    const [color, setColor] = useState('#e8eaf0');

    const handleSubmit = () => {
        if (!name.trim()) return;
        onCreate(name.trim(), color);
        setName('');
        setColor('#e8eaf0');
    };

    return (
        <div className={styles.panel}>
            <Input
                placeholder="Car name"
                value={name}
                onChange={e => setName(e.target.value)}
            />
            <ColorPicker value={color} onChange={e => setColor(e.target.value)} />
            <Button onClick={handleSubmit} disabled={!name.trim()}>
                Create
            </Button>
        </div>
    );
}