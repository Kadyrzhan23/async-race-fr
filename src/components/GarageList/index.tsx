import React from 'react'
import CarCard from '../CarCard'
import Pagination from '../Pagination'
import type { Car } from '../../types'
import styles from './GarageList.module.css'

interface GarageListProps {
    cars: Car[]
    totalCars: number
    page: number
    totalPages: number
    onPageChange: (page: number) => void
    onSelect: (car: Car) => void
    onDelete: (id: number) => void
}

export default function GarageList({
                                       cars,
                                       totalCars,
                                       page,
                                       totalPages,
                                       onPageChange,
                                       onSelect,
                                       onDelete,
                                   }: GarageListProps) {
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
                {cars.map(car => (
                    <CarCard
                        key={car.id}
                        car={car}
                        onSelect={onSelect}
                        onDelete={onDelete}
                    />
                ))}
            </div>

            <div className={styles.footer}>
                <span className={styles.showing}>Showing {cars.length} of {totalCars}</span>
                <Pagination
                    page={page}
                    totalPages={totalPages}
                    onPrev={() => onPageChange(page - 1)}
                    onNext={() => onPageChange(page + 1)}
                />
            </div>
        </div>
    )
}