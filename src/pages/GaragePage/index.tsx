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
    const {cars, getCars, isLoading, error} = useGarage()
    const { raceStatus, winner, carStates} = useEngine()
    const [selectedCar, setSelectedCar] = useState<Car | null>(null)
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
                isRacing={raceStatus === 'running'} isGarageEmpty={cars.length === 0}/>

            {winner && (
                <WinnerBanner
                    carName={winner.name}
                    time={(carStates[winner.id]?.duration ?? 0) / 1000}
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
