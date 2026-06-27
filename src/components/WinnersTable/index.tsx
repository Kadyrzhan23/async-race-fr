import React from 'react'
import CarSVG from '../CarSvg'
import type { Winner, Car, SortField, SortOrder } from '../../types'
import styles from './WinnersTable.module.css'

interface WinnersTableProps {
    winners: (Winner & Pick<Car, 'name' | 'color'>)[]
    sort: SortField
    order: SortOrder
    onSort: (field: SortField) => void
}

const MEDALS: Record<number, string> = { 1: '🥇', 2: '🥈', 3: '🥉' }
const fractionDigit = 2
export default function WinnersTable({ winners, sort, order, onSort }: WinnersTableProps) {
    const arrow = (field: SortField) => {
        if (sort !== field) return null
        return order === 'ASC' ? ' ↑' : ' ↓'
    }

    return (
        <div className={styles.table}>
        <div className={styles.head}>
        <span className={styles.th}>#</span>
    <span className={styles.th}>Car</span>
        <span className={styles.th}>Name</span>
        <span className={`${styles.th} ${styles.right}`} onClick={() => onSort('wins')}>
    Wins{arrow('wins')}
    </span>
    <span className={`${styles.th} ${styles.right}`} onClick={() => onSort('time')}>
    Best time{arrow('time')}
    </span>
    </div>

    {winners.map((w, i) => (
        <div key={w.id} className={styles.row}>
    <span className={styles.num}>{MEDALS[i + 1] ?? i + 1}</span>
    <span><CarSVG color={w.color} width={32} height={16} /></span>
    <span className={styles.name}>{w.name}</span>
        <span className={`${styles.wins} ${styles.right}`}>{w.wins}</span>
    <span className={`${styles.time} ${styles.right}`}>{w.time.toFixed(fractionDigit)}s</span>
    </div>
    ))}
    </div>
)
}