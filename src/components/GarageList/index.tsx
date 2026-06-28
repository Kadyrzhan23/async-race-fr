import React from 'react'
import CarCard from '../CarCard'
import Pagination from '../Pagination'
import type {Car} from '../../types'
import styles from './GarageList.module.css'

interface GarageListProps {
    cars: Car[]
    totalCars: number
    page: number
    totalPages: number
    onPageChange: (page: number) => void
    onSelect: (car: Car) => void
    raceSignal: number
    resetSignal: number
}

export default function GarageList({
                                       cars, totalCars, page,
                                       totalPages, onPageChange,
                                       onSelect, raceSignal, resetSignal
                                   }: GarageListProps) {
    const PAGE_CAPACITY = 7;
    const visibleCount = cars.filter((_, i) => i >= (page - 1) * PAGE_CAPACITY && i < page * PAGE_CAPACITY).length;
    return (
        <div>
            <div className={styles.header}>
        <span className={styles.title}>
          Garage
          <span className={styles.count}>{totalCars} cars</span>
        </span>
                <span className={styles.pageInfo}>Page {page} of {totalPages}</span>
            </div>

            <div className={styles.list}>
                {cars.length === 0 && <h1>Garage is empty, add cars in it</h1>}
                {cars
                    .filter((_, index) => index >= (page - 1) * PAGE_CAPACITY && index < page * PAGE_CAPACITY)
                    .map((car) => (
                        <CarCard
                            key={car.id}
                            car={car}
                            onSelect={onSelect}
                            raceSignal={raceSignal}
                            resetSignal={resetSignal}
                        />
                    ))}
            </div>

            <div className={styles.footer}>
                <span className={styles.showing}>Showing {visibleCount} of {totalCars}</span>
                <Pagination
                    page={page} totalPages={totalPages}
                    onPrev={() => onPageChange(page - 1)}
                    onNext={() => onPageChange(page + 1)}
                />
            </div>
        </div>
    )
}