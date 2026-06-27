import React, { useState } from 'react';
import Input from '../Input';
import ColorPicker from '../ColorPicker';
import Button from '../Button';
import styles from './CarPanel.module.css';
import {useGarage} from "../../store/garageStore.ts";

export default function CreateCarPanel() {
    const [name, setName] = useState('');
    const [color, setColor] = useState('#e8eaf0');
    const createCar = useGarage(state => state.createCar);
    const handleSubmit = async() => {
        if (!name.trim()) return;
        await createCar(name.trim(), color);
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