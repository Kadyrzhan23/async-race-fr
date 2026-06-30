import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { Car, CarRaceState, RaceStatus } from '../types'
import {fetchDriveStatus, fetchEngineData} from "../api/engine.ts";
import {useWinners} from "./winnerStore.ts";

const MS_TO_SECONDS = 1000
interface EngineStore {
    raceStatus: RaceStatus
    raceStartedAt: number | null
    winner: Car | null
    carStates: Record<number, CarRaceState>
    startStopEngine: (cars: Car[], status: 'started' | 'stopped') => Promise<void>
    driveAll: (cars: Car[]) => Promise<void>
    startRace: (cars: Car[]) => Promise<void>
    resetRace: (cars: Car[]) => Promise<void>
}

const getWinner = (cars: Car[], carStates: Record<number, CarRaceState>): Car | null => cars
        .filter((car) => carStates[car.id]?.status === 'finished')
        .sort((a, b) => (carStates[a.id]?.duration ?? 0) - (carStates[b.id]?.duration ?? 0))[0] ?? null

export const useEngine = create<EngineStore>()(
    devtools((set, get) => ({
        raceStatus: 'idle',
        winner: null,
        carStates: {},
        raceStartedAt: null,
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
            set({ carStates, raceStatus: 'running', raceStartedAt: Date.now() })
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
                                    brokenAt: data.success ? undefined : Date.now(),
                                } as CarRaceState
                            }
                        }))
                    } catch {
                        set((state) => ({
                            carStates: {
                                ...state.carStates,
                                [car.id]: { ...state.carStates[car.id], status: 'broken', brokenAt: Date.now() } as CarRaceState
                            }
                        }))
                    }
                }))
        },

        startRace: async (cars) => {
            set({ raceStatus: 'starting', winner: null })
            await get().startStopEngine(cars, 'started')
            await get().driveAll(cars)
            const winner = getWinner(cars, get().carStates)
            set({ raceStatus: 'finished', winner })
            if (winner) {
                const winnerTime = get().carStates[winner.id]?.duration ?? 0
                useWinners.getState().saveWinner(winner.id, winnerTime / MS_TO_SECONDS)
            }
        },
        resetRace: async (cars) => {
            set({ raceStatus: 'resetting' })
            await Promise.all(cars.map(car => fetchEngineData(car.id, 'stopped')))
            const carIds = cars.map(c => c.id)
            set((state) => ({
                raceStatus: 'idle',
                winner: null,
                carStates: Object.fromEntries(
                    Object.entries(state.carStates).filter(([id]) => !carIds.includes(Number(id)))
                ),
            }))
        },
    }))
)