import React from 'react';
import Input from '../Input';
import ColorPicker from '../ColorPicker';
import Button from '../Button';
import styles from './EditCarPanel.module.css';
import type { Car } from '../../types';
import {useGarage} from "../../store/garageStore.ts";

interface EditCarPanelProps {
    car: Car | null;
    setCar: (param : Car | null) => void;
}

export default function EditCarPanel({ car,  setCar }: EditCarPanelProps) {
    const updateCar = useGarage(state => state.updateCar);



    if (!car) return null;  // ← после всех хуков

    async function updateHandle(){
        if(car === null){
            return
        }
        await updateCar(car)
        setCar(null)
    }


    return (
        <div className={styles.panel}>
            <Input
                placeholder="Car name"
                value={car.name}
                onChange={e => setCar({ ...car, name: e.target.value })}
            />
            <ColorPicker value={car.color} onChange={e => setCar({ ...car, color: e.target.value })} />
            <Button onClick={updateHandle} disabled={!car.name.trim()}>
                Save
            </Button>
            <Button variant="ghost" onClick={()=> setCar(null)}>
                Cancel
            </Button>
        </div>
    );
}