import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { Car, CarRaceState, RaceStatus } from '../types'
import {fetchDriveStatus, fetchEngineData} from "../api/engine.ts";

interface EngineStore {
    raceStatus: RaceStatus
    winner: Car | null
    carStates: Record<number, CarRaceState>
    startStopEngine: (cars: Car[], status: 'started' | 'stopped') => Promise<void>
    driveAll: (cars: Car[]) => Promise<void>
    startRace: (cars: Car[]) => Promise<void>
    resetRace: () => void
}

const getWinner = (cars: Car[], carStates: Record<number, CarRaceState>): Car | null => {
    return cars
        .filter((car) => carStates[car.id]?.status === 'finished')
        .sort((a, b) => (carStates[a.id]?.duration ?? 0) - (carStates[b.id]?.duration ?? 0))[0] ?? null
}

export const useEngine = create<EngineStore>()(
    devtools((set, get) => ({
        raceStatus: 'idle',
        winner: null,
        carStates: {},

        startStopEngine: async (cars, status) => {
            const results = await Promise.all(
                cars.map(async (car) => {
                    const data = await fetchEngineData(car.id, status)
                    return { car, duration: data.distance / data.velocity }
                })
            )
            const carStates: Record<number, CarRaceState> = {}
            results.forEach(({ car, duration }) => {
                carStates[car.id] = { status: 'driving', duration, position: 0 }
            })
            set({ carStates, raceStatus: 'running' })
        },

        driveAll: async (cars) => {
            await Promise.all(
                cars.map(async (car) => {
                    try {
                        const data = await fetchDriveStatus(car.id)
                        set((state) => ({
                            carStates: {
                                ...state.carStates,
                                [car.id]: {
                                    ...state.carStates[car.id],
                                    status: data.success ? 'finished' : 'broken',
                                } as CarRaceState
                            }
                        }))
                    } catch {
                        set((state) => ({
                            carStates: {
                                ...state.carStates,
                                [car.id]: { ...state.carStates[car.id], status: 'broken' } as CarRaceState
                            }
                        }))
                    }
                }))
        },

        startRace: async (cars) => {
            await get().startStopEngine(cars, 'started')
            await get().driveAll(cars)
            set({ raceStatus: 'finished', winner: getWinner(cars, get().carStates) })
        },
        resetRace: () => set({ raceStatus: 'idle', winner: null, carStates: {} }),
    }))
)