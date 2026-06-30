import React from 'react'
import styles from './WinnerBanner.module.css'
import {useEngine} from "../../store/engineStore.ts";
import type {Car} from '../../types'

interface WinnerBannerProps {
  carName: string
  time: number
  cars: Car[]
}
const fractionDigits = 2
export default function WinnerBanner({ carName, time, cars }: WinnerBannerProps) {
    const {resetRace} = useEngine()
  return (
      <div className={styles.banner}>
        <div className={styles.icon}>🏆</div>
        <div className={styles.text}>
          <span className={styles.label}>Race finished!</span>
          <span className={styles.winner}>{carName} — {time.toFixed(fractionDigits)}s</span>
        </div>
        <button className={styles.close} onClick={() => resetRace(cars)}>✕</button>
      </div>
  )
}