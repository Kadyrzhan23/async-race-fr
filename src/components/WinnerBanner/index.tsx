import React from 'react'
import styles from './WinnerBanner.module.css'

interface WinnerBannerProps {
  carName: string
  time: number
  onClose: () => void
}

export default function WinnerBanner({ carName, time, onClose }: WinnerBannerProps) {
  return (
      <div className={styles.banner}>
        <div className={styles.icon}>🏆</div>
        <div className={styles.text}>
          <span className={styles.label}>Race finished!</span>
          <span className={styles.winner}>{carName} — {time.toFixed(2)}s</span>
        </div>
        <button className={styles.close} onClick={onClose}>✕</button>
      </div>
  )
}