import React from 'react'
import CarSVG from '../CarSvg'
import type { WinnerWithCar } from '../../types'
import styles from './WinnersTable.module.css'

interface WinnersTableProps {
    winners: WinnerWithCar[]
    page: number
    sort: 'wins' | 'time'
    order: 'ASC' | 'DESC'
    onSort: (field: 'wins' | 'time') => void
}

const PAGE_SIZE = 10

export default function WinnersTable({ winners, page, sort, order, onSort }: WinnersTableProps) {
    const arrow = (field: 'wins' | 'time') => sort === field ? (order === 'ASC' ? ' ↑' : ' ↓') : ''

    return (
        <div className={styles.table}>
            <div className={styles.head}>
                <span className={styles.th}>#</span>
                <span className={styles.th}>Car</span>
                <span className={`${styles.th} ${styles.name}`}>Name</span>
                <span className={`${styles.th} ${styles.right}`} onClick={() => onSort('wins')}>
                    Wins{arrow('wins')}
                </span>
                <span className={`${styles.th} ${styles.right}`} onClick={() => onSort('time')}>
                    Best time{arrow('time')}
                </span>
            </div>

            {winners.map((w, i) => (
                <div key={w.id} className={styles.row}>
                    <span className={styles.num}>{(page - 1) * PAGE_SIZE + i + 1}</span>
                    <span className={styles.car}><CarSVG color={w.color} /></span>
                    <span className={styles.name}>{w.name}</span>
                    <span className={`${styles.wins} ${styles.right}`}>{w.wins}</span>
                    <span className={`${styles.time} ${styles.right}`}>{w.time.toFixed(2)}s</span>
                </div>
            ))}
        </div>
    )
}
