import React from 'react'
import styles from './CarCardSkeleton.module.css'

export default function CarCardSkeleton() {
    return (
        <div className={styles.card}>
            <div className={styles.top}>
                <div className={styles.engineBtns}>
                    <div className={styles.circle} />
                    <div className={styles.circle} />
                </div>
                <div className={styles.name} />
                <div className={styles.actionBtns}>
                    <div className={styles.btn} />
                    <div className={styles.btn} />
                </div>
            </div>
            <div className={styles.trackWrap}>
                <div className={styles.track} />
            </div>
        </div>
    )
}
