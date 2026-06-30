import React, { useEffect, useState } from 'react'
import { useWinners } from "../../store/winnerStore.ts"
import Pagination from '../../components/Pagination'
import WinnersTable from '../../components/WinnersTable'
import styles from './WinnersPage.module.css'

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
            <h2 className={styles.title}>
                Winners <span className={styles.count}>{totalWinners}</span>
            </h2>
            <p className={styles.pageInfo}>Page {page}</p>

            {isLoading ? <p>Loading...</p> : (
                <WinnersTable
                    winners={winners}
                    page={page}
                    sort={sort}
                    order={order}
                    onSort={handleSort}
                />
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
