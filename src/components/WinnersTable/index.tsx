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
    return (
        <table className={styles.table}>
            <thead>
            <tr>
                <th>#</th>
                <th>Car</th>
                <th>Name</th>
                <th onClick={() => onSort('wins')} className={styles.sortable}>
                    Wins {sort === 'wins' ? (order === 'ASC' ? '↑' : '↓') : ''}
                </th>
                <th onClick={() => onSort('time')} className={styles.sortable}>
                    Best time {sort === 'time' ? (order === 'ASC' ? '↑' : '↓') : ''}
                </th>
            </tr>
            </thead>
            <tbody>
            {winners.map((w, i) => (
                <tr key={w.id}>
                    <td>{(page - 1) * PAGE_SIZE + i + 1}</td>
                    <td><CarSVG color={w.color} /></td>
                    <td>{w.name}</td>
                    <td>{w.wins}</td>
                    <td>{w.time.toFixed(2)}s</td>
                </tr>
            ))}
            </tbody>
        </table>
    )
}