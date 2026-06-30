import React from 'react'
import Button from '../Button'
import styles from './RaceControlPanel.module.css'
import {useEngine} from "../../store/engineStore.ts";
import {useGarage} from "../../store/garageStore.ts";
import type {Car} from '../../types';

interface RaceControlPanelProps {
    cars: Car[]
    isRacing: boolean
    isGarageEmpty: boolean
}

export default function RaceControlPanel({cars, isRacing, isGarageEmpty}: RaceControlPanelProps) {
    const {resetRace, startRace} = useEngine()
    const {generateCars} = useGarage()
    return (
        <div className={styles.panel}>
            <Button variant="success" disabled={isRacing || isGarageEmpty} onClick={() => startRace(cars)}>
                Race
            </Button>
            <Button variant="danger" disabled={!isRacing} onClick={() => resetRace(cars)}>
                Reset
            </Button>
            <div className={styles.spacer}/>
            <Button variant="outline" disabled={isRacing} onClick={generateCars}>
                Generate 100 cars
            </Button>
        </div>
    )
}
