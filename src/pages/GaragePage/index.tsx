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
    const {cars, getCars, isLoading, error, generateCars} = useGarage()
    const [selectedCar, setSelectedCar] = useState<Car | null>(null)
    const [raceSignal, setRaceSignal] = useState(0)
    const [resetSignal, setResetSignal] = useState(0)
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
                isRacing={raceSignal > resetSignal}
                onRace={() => setRaceSignal(s => s + 1)} isGarageEmpty={cars.length > 0}
                onReset={() => { setResetSignal(s => s + 1); setWinner(null) }}
                onGenerate={generateCars}
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
                    cars={cars} totalCars={cars.length}
                    raceSignal={raceSignal} resetSignal={resetSignal}
                    page={page} totalPages={Math.ceil(cars.length / PAGE_SIZE)}
                    onPageChange={setPage} onSelect={setSelectedCar}
                />
            }
        </div>
    )
}