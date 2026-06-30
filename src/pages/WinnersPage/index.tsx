import React, { useEffect, useState } from 'react'
import  useWinners  from "../../store/winnerStore.ts"
import CarSVG from '../../components/CarSvg'
import Pagination from '../../components/Pagination'
import styles from './WinnersPage.module.css'
import { WinnerWithCar} from "../../types";

const PAGE_SIZE = 10

export default function WinnersPage() {
    const { winners, totalWinners, isLoading, getWinners } = useWinners()
    const [page, setPage] = useState(1)
    const [sort, setSort] = useState<'wins' | 'time'>('time')
    const [order, setOrder] = useState<'ASC' | 'DESC'>('ASC')

    useEffect(() => {
        getWinners(page, sort, order)
    }, [page, sort, order])

    const handleSort = (field: 'wins' | 'time') => {
        if (sort === field) {
            setOrder(o => o === 'ASC' ? 'DESC' : 'ASC')
        } else {
            setSort(field)
            setOrder('ASC')
        }
    }

    return (
        <div className={styles.page}>
            <h2 className={styles.title}>Winners <span className={styles.count}>{totalWinners}</span></h2>
            <p className={styles.pageInfo}>Page {page}</p>

            {isLoading ? <p>Loading...</p> : (
                <div className={styles.tableWrapper}>
                <table className={styles.table}>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Car</th>
                        <th>Name</th>
                        <th onClick={() => handleSort('wins')} className={styles.sortable}>
                            Wins {sort === 'wins' ? (order === 'ASC' ? '↑' : '↓') : ''}
                        </th>
                        <th onClick={() => handleSort('time')} className={styles.sortable}>
                            Best time {sort === 'time' ? (order === 'ASC' ? '↑' : '↓') : ''}
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {winners.map((w:WinnerWithCar, i:number) => (
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
                </div>
            )}

            <Pagination
                page={page}
                totalPages={Math.ceil(totalWinners / PAGE_SIZE)}
                onPrev={() => setPage(p => p - 1)}
                onNext={() => setPage(p => p + 1)}
            />
        </div>
    )
}