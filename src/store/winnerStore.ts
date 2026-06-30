import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { Winner, WinnerWithCar } from '../types'

const BASE_URL = 'http://localhost:3000'

interface WinnersStore {
    winners: WinnerWithCar[]
    totalWinners: number
    isLoading: boolean
    getWinners: (page: number, sort: 'wins' | 'time', order: 'ASC' | 'DESC') => Promise<void>
    saveWinner: (id: number, time: number) => Promise<void>
}

export const useWinners = create<WinnersStore>()(devtools((set) => ({
    winners: [],
    totalWinners: 0,
    isLoading: false,

    getWinners: async (page, sort, order) => {
        set({ isLoading: true })
        const res = await fetch(`${BASE_URL}/winners?_page=${page}&_limit=10&_sort=${sort}&_order=${order}`)
        const total = res.headers.get('X-Total-Count')
        const data: Winner[] = await res.json()

        const withCars: WinnerWithCar[] = await Promise.all(
            data.map(async (w) => {
                const car = await fetch(`${BASE_URL}/garage/${w.id}`).then(r => r.json())
                return { ...w, name: car.name, color: car.color }
            })
        )
        set({ winners: withCars, totalWinners: Number(total), isLoading: false })
    },

    saveWinner: async (id, time) => {
        const res = await fetch(`${BASE_URL}/winners/${id}`)
        if (res.ok) {
            const existing: Winner = await res.json()
            await fetch(`${BASE_URL}/winners/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    wins: existing.wins + 1,
                    time: Math.min(existing.time, time)
                })
            })
        } else {
            await fetch(`${BASE_URL}/winners`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, wins: 1, time })
            })
        }
    }
})))