import React from 'react'
import Button from '../Button'
import styles from './RaceControlPanel.module.css'

interface RaceControlPanelProps {
    isRacing: boolean
    onRace: () => void
    onReset: () => void
    onGenerate: () => void,
    isGarageEmpty:boolean
}

export default function RaceControlPanel({ isRacing, onRace, onReset, onGenerate, isGarageEmpty }: RaceControlPanelProps) {
    return (
        <div className={styles.panel}>
            <Button variant="success" disabled={isRacing && isGarageEmpty} onClick={onRace}>
                Race
            </Button>
            <Button variant="danger" disabled={!isRacing} onClick={onReset}>
                Reset
            </Button>
            <div className={styles.spacer} />
            <Button variant="outline" disabled={isRacing} onClick={onGenerate}>
                Generate 100 cars
            </Button>
        </div>
    )
}