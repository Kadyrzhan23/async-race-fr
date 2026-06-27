import React from 'react'
import styles from './WinnerBanner.module.css'

interface WinnerBannerProps {
  carName: string
  time: number
  onClose: () => void
}
const fractionDigits = 2
export default function WinnerBanner({ carName, time, onClose }: WinnerBannerProps) {
  return (
      <div className={styles.banner}>
        <div className={styles.icon}>🏆</div>
        <div className={styles.text}>
          <span className={styles.label}>Race finished!</span>
          <span className={styles.winner}>{carName} — {time.toFixed(fractionDigits)}s</span>
        </div>
        <button className={styles.close} onClick={onClose}>✕</button>
      </div>
  )
}