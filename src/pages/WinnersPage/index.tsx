import React, {useState} from 'react'
import WinnersTable from '../../components/WinnersTable'
import Pagination from '../../components/Pagination'
import type {SortField, SortOrder} from '../../types'
import styles from './WinnersPage.module.css'

const MOCK_WINNERS = [{id: 1, name: 'Tesla Model S', color: '#378ADD', wins: 7, time: 3.82}, {
    id: 2,
    name: 'BMW M5',
    color: '#1D9E75',
    wins: 5,
    time: 4.11
}, {id: 3, name: 'Porsche 911', color: '#7F77DD', wins: 4, time: 4.44}, {
    id: 4,
    name: 'Lamborghini',
    color: '#D85A30',
    wins: 3,
    time: 4.79
}, {id: 5, name: 'Ford Mustang', color: '#E24B4A', wins: 2, time: 5.03},]
export default function WinnersPage() {
    const [sort, setSort] = useState<SortField>('wins')
    const [order, setOrder] = useState<SortOrder>('DESC')
    const [page, setPage] = useState(1)
    const handleSort = (field: SortField) => {
        if (sort === field) {
            setOrder(o => o === 'ASC' ? 'DESC' : 'ASC')
        } else {
            setSort(field)
            setOrder('DESC')
        }
    }
    return (<div className={styles.page}>
        <div className={styles.header}><span className={styles.title}>Winners</span> <span className={styles.total}>23 total</span>
        </div>
        <WinnersTable winners={MOCK_WINNERS} sort={sort} order={order} onSort={handleSort}/>
        <div className={styles.footer}><Pagination page={page} totalPages={3} onPrev={() => setPage(p => p - 1)}
                                                   onNext={() => setPage(p => p + 1)}/></div>
    </div>)
}