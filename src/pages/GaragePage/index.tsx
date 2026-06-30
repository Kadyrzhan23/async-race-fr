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
import {useEngine} from "../../store/engineStore.ts";

const PAGE_SIZE = 7;

export default function GaragePage() {
    const {cars, getCars, isLoading, error, page, setPage} = useGarage()
    const { raceStatus, winner, carStates} = useEngine()
    const [selectedCar, setSelectedCar] = useState<Car | null>(null)

    useEffect(() => {
        getCars()
    }, [])

    const visibleCars = cars.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

    return (
        <div className={styles.page}>
            <div className={styles.panels}>
                <CreateCarPanel/>
                <EditCarPanel car={selectedCar} setCar={setSelectedCar}/>
            </div>

            <RaceControlPanel
                cars={visibleCars}
                isRacing={raceStatus === 'running' || raceStatus === 'starting' || raceStatus === 'resetting' || raceStatus === 'finished'}
                isGarageEmpty={cars.length === 0}/>

            {raceStatus === 'starting' && (
                <p className={styles.statusMsg}>⏳ Starting engines...</p>
            )}
            {raceStatus === 'resetting' && (
                <p className={styles.statusMsg}>🔄 Resetting cars...</p>
            )}

            {winner && (
                <WinnerBanner
                    carName={winner.name}
                    time={(carStates[winner.id]?.duration ?? 0) / 1000}
                    cars={visibleCars}
                />
            )}

            {error && <p>{error}</p>}
            {isLoading
                ? Array.from({length: PAGE_SIZE}).map((_, i) => <CarCardSkeleton key={i}/>)
                : <GarageList page={page} onPageChange={setPage} onSelect={setSelectedCar}/>
            }
        </div>
    )
}
