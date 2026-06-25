import React, { useRef } from 'react'
import CarSVG from '../CarSvg'
import type { Car } from '../../types'
import styles from './CarCard.module.css'

interface CarCardProps {
    car: Car
    onSelect: (car: Car) => void
    onDelete: (id: number) => void
}

export default function CarCard({ car, onSelect, onDelete }: CarCardProps) {
    const trackRef = useRef<HTMLDivElement>(null)
    const carRef = useRef<HTMLDivElement>(null)

    return (
        <div className={styles.card}>
            <div className={styles.top}>
                <div className={styles.engineBtns}>
                    <button className={styles.goBtn} title="Start engine">▶</button>
                    <button className={styles.stopBtn} title="Stop engine">■</button>
                </div>
                <span className={styles.carName}>{car.name}</span>
                <div className={styles.actionBtns}>
                    <button className={styles.selectBtn} onClick={() => onSelect(car)}>Select</button>
                    <button className={styles.deleteBtn} onClick={() => onDelete(car.id)}>Delete</button>
                </div>
            </div>

            <div className={styles.trackWrap}>
                <div className={styles.track} ref={trackRef}>
                    <div className={styles.roadMarks}>
                        {Array.from({ length: 14 }).map((_, i) => (
                            <div key={i} className={styles.roadMark} />
                        ))}
                    </div>
                    <div className={styles.finishLine} />
                    <div className={styles.carEl} ref={carRef}>
                        <CarSVG color={car.color} />
                    </div>
                </div>
            </div>
        </div>
    )
}