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
    const {position, status, start, stop, reset, jumpTo} = useCarAnimation()
    const raceStatus = useEngine(state => state.raceStatus)
    const isRacing = raceStatus === 'running' || raceStatus === 'starting'
    const maxTranslateRef = useRef(0)
    const trackRef = useRef<HTMLDivElement>(null)
    const carRef = useRef<HTMLDivElement>(null)
    const carState = useEngine(state => state.carStates[car.id])
    const raceStartedAt = useEngine(state => state.raceStartedAt)
    useEffect(() => {
        const recalc = () => {
            const trackEl = trackRef.current
            const carEl = carRef.current
            if (!trackEl || !carEl) return
            maxTranslateRef.current = trackEl.offsetWidth - carEl.offsetWidth - FINISH_COLUMN_WIDTH
        }
        recalc()
        window.addEventListener('resize', recalc)
        return () => window.removeEventListener('resize', recalc)
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
            if (carState.brokenAt && raceStartedAt) {
                const brokenProgress = Math.min((carState.brokenAt - raceStartedAt) / carState.duration, 1)
                jumpTo(brokenProgress)
            } else {
                stop()
            }
        } else if (carState?.status === 'finished') {
            jumpTo(1)
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

    async function handleStop(){
        await fetchEngineData(car.id, 'stopped')
        reset()
    }


    return (
        <div className={styles.card}>
            <div className={styles.top}>
                <div className={styles.engineBtns}>
                    <button className={styles.goBtn} onClick={handleStart}
                            disabled={isRacing || status === 'running' || status === 'finished'}>▶
                    </button>
                    <button className={styles.stopBtn}
                            onClick={handleStop}
                            disabled={status === 'idle'}>■
                    </button>
                </div>
                <span className={styles.carName}>{car.name}</span>
                <div className={styles.actionBtns}>
                    <button className={styles.selectBtn} onClick={() => onSelect(car)} disabled={isRacing}>Select</button>
                    <button className={styles.deleteBtn} onClick={() => deleteCar(car.id)} disabled={isRacing}>Delete</button>
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
