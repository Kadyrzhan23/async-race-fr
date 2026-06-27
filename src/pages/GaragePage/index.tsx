import React, { useState } from 'react'
import CreateCarPanel from '../../components/CreateCarPanel'
import EditCarPanel from '../../components/EditCarPanel'
import RaceControlPanel from '../../components/RaceControlPanel'
import WinnerBanner from '../../components/WinnerBanner'
import GarageList from '../../components/GarageList'
import type { Car } from '../../types'
import styles from './GaragePage.module.css'

const MOCK_CARS: Car[] = [
    { id: 1, name: 'Tesla Model S', color: '#378ADD' },
    { id: 2, name: 'Ford Mustang', color: '#E24B4A' },
    { id: 3, name: 'BMW M5', color: '#1D9E75' },
    { id: 4, name: 'Toyota Supra', color: '#EF9F27' },
    { id: 5, name: 'Porsche 911', color: '#7F77DD' },
    { id: 6, name: 'Lamborghini', color: '#D85A30' },
    { id: 7, name: 'Honda Civic', color: '#D4537E' },
]

export default function GaragePage() {
    const [selectedCar, setSelectedCar] = useState<Car | null>(null)
    const [isRacing, setIsRacing] = useState(false)
    const [winner, setWinner] = useState<{ carName: string; time: number } | null>(null)
    const [page, setPage] = useState(1)

    return (
        <div className={styles.page}>
            <div className={styles.panels}>
                <CreateCarPanel onCreate={(name, color) => console.log('create', name, color)} />
                <EditCarPanel car={selectedCar} onCancel={() => setSelectedCar(null)}
                    onSave={(id, name, color) => console.log('save', id, name, color)}
                />
            </div>

            <RaceControlPanel
                isRacing={isRacing} onRace={() => setIsRacing(true)}
                onReset={() => { setIsRacing(false); setWinner(null) }}
                onGenerate={() => console.log('generate')}
            />

            {winner && (
                <WinnerBanner
                    carName={winner.carName} time={winner.time}  onClose={() => setWinner(null)}
                />
            )}

            <GarageList
                cars={MOCK_CARS} totalCars={148}
                page={page} totalPages={22}
                onPageChange={setPage} onSelect={setSelectedCar}
                onDelete={(id) => console.log('delete', id)}
            />
        </div>
    )
}