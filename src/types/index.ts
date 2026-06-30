export interface Car {
    id: number;
    name: string;
    color: string;
}

export interface Winner {
    id: number;
    wins: number;
    time: number;
}

export interface EngineResponse {
    velocity: number;
    distance: number;
}

export interface DriveResponse {
    success: boolean;
}

export type SortField = 'id' | 'wins' | 'time';

export type SortOrder = 'ASC' | 'DESC';

export type RaceStatus = 'idle' | 'running' | 'finished';

export interface CarRaceState {
    status: 'idle' | 'driving' | 'broken' | 'finished';
    duration: number;
    position: number;
    brokenAt?: number;
}

export interface Winner {
    id: number
    wins: number
    time: number
}

export interface WinnerWithCar extends Winner {
    name: string
    color: string
}