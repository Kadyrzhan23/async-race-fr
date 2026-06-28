import React, {useEffect, useState} from 'react'
import CreateCarPanel from '../../components/CreateCarPanel'
import EditCarPanel from '../../components/EditCarPanel'
import RaceControlPanel from '../../components/RaceControlPanel'
import WinnerBanner from '../../components/WinnerBanner'
import GarageList from '../../components/GarageList'
import CarCardSkeleton from '../../components/CarCard/CarCardSkeleton'
import type {Car} from '../../types'
import styles from './GaragePage.module.css'
import {useGarage} from "../../store/garageStore.ts";

const PAGE_SIZE = 7;

export default function GaragePage() {
    const {cars, getCars, isLoading, error} = useGarage()
    const [selectedCar, setSelectedCar] = useState<Car | null>(null)
    const [isRacing, setIsRacing] = useState(false)
    const [winner, setWinner] = useState<{ carName: string; time: number } | null>(null)
    const [page, setPage] = useState(1)

    useEffect(() => {
        getCars()
    }, [])

    return (
        <div className={styles.page}>
            <div className={styles.panels}>
                <CreateCarPanel/>
                <EditCarPanel car={selectedCar} setCar={setSelectedCar}/>
            </div>

            <RaceControlPanel
                isRacing={isRacing} onRace={() => setIsRacing(true)}
                onReset={() => {
                    setIsRacing(false);
                    setWinner(null)
                }}
                onGenerate={() => console.log('generate')}
            />

            {winner && (
                <WinnerBanner
                    carName={winner.carName} time={winner.time} onClose={() => setWinner(null)}
                />
            )}

            {error && <p>{error}</p>}
            {}
            {isLoading
                ? Array.from({length: PAGE_SIZE}).map((_, i) => <CarCardSkeleton key={i}/>)
                : <GarageList
                    cars={cars} totalCars={cars.length} isRacing={isRacing}
                    page={page} totalPages={Math.ceil(cars.length / PAGE_SIZE)}
                    onPageChange={setPage} onSelect={setSelectedCar}
                />
            }
        </div>
    )
}