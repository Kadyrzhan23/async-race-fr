import {useEffect, useRef} from 'react'
import CarSVG from '../CarSvg'
import type {Car} from '../../types'
import styles from './CarCard.module.css'
import {useGarage} from "../../store/garageStore.ts";
import {useCarAnimation} from "../../hooks/useCarAnimation.ts";
import React from "react";
import {fetchDriveStatus, fetchEngineData} from "../../api/engine.ts";
import {useEngine} from "../../store/engineStore.ts";

interface CarCardProps {
    car: Car
    onSelect: (car: Car) => void
}

const FINISH_COLUMN_WIDTH = 12

export default function CarCard({car, onSelect}: CarCardProps) {
    const {deleteCar} = useGarage()
    const {position, status, start, stop, reset} = useCarAnimation()
    const maxTranslateRef = useRef(0)
    const trackRef = useRef<HTMLDivElement>(null)
    const carRef = useRef<HTMLDivElement>(null)
    const carState = useEngine(state => state.carStates[car.id])
    const raceStartedAt = useEngine(state => state.raceStartedAt)
    useEffect(() => {
        const trackEl = trackRef.current
        const carEl = carRef.current
        if (!trackEl || !carEl) return
        maxTranslateRef.current = trackEl.offsetWidth - carEl.offsetWidth - FINISH_COLUMN_WIDTH
    }, [])

    useEffect(() => {
        if (!carRef.current) return
        carRef.current.style.transform = `translateX(${position * maxTranslateRef.current}px)`
    }, [position])

    useEffect(() => {
        if (carState?.status === 'driving') {
            const elapsed = raceStartedAt ? Date.now() - raceStartedAt : 0
            start(carState.duration, elapsed)
        } else if (carState?.status === 'broken') {
            stop()
        } else if (!carState) {
            reset()
        }
    }, [carState?.status])


    async function handleStart(){
        const data = await fetchEngineData(car.id,'started')
        const durationMs = data.distance / data.velocity
        start(durationMs)

        const drive = await fetchDriveStatus(car.id)
        if (!drive.success) stop()
    }


    return (
        <div className={styles.card}>
            <div className={styles.top}>
                <div className={styles.engineBtns}>
                    <button className={styles.goBtn} onClick={handleStart}
                            disabled={status === 'running' || status === 'finished'}>▶
                    </button>
                    <button className={styles.stopBtn}
                            onClick={status === 'finished' ? reset : stop}
                            disabled={status === 'idle' || status === 'stopped'}>■
                    </button>
                </div>
                <span className={styles.carName}>{car.name}</span>
                <div className={styles.actionBtns}>
                    <button className={styles.selectBtn} onClick={() => onSelect(car)}>Select</button>
                    <button className={styles.deleteBtn} onClick={() => deleteCar(car.id)}>Delete</button>
                </div>
            </div>
            <div className={styles.trackWrap}>
                <div className={styles.track} ref={trackRef}>
                    <div className={styles.roadMarks}>
                        {Array.from({length: 14}).map((_, i) => (
                            <div key={i} className={styles.roadMark}/>
                        ))}
                    </div>
                    <div className={styles.finishLine}/>
                    <div className={styles.carEl} ref={carRef}>
                        <CarSVG color={car.color}/>
                    </div>
                </div>
            </div>
        </div>
    )
}
