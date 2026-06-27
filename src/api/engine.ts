import { DriveResponse, EngineResponse } from '../types'

const BASE_URL = 'http://localhost:3000'

export const fetchEngineData = async (carId: number, status: 'started' | 'stopped'): Promise<EngineResponse> => {
    const res = await fetch(`${BASE_URL}/engine?id=${carId}&status=${status}`)
    return res.json()
}

export const fetchDriveStatus = async (carId: number): Promise<DriveResponse> => {
    const res = await fetch(`${BASE_URL}/engine?id=${carId}&status=drive`)
    return res.json()
}