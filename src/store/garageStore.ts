import {create, Mutate, StoreApi, UseBoundStore} from 'zustand'
import {Car} from "../types";

interface Garage {
    cars: Car[],
    total: number,
    page: number,
    isLoading: boolean,
    error: null | string,
    getCars: () => Promise<void>,
    createCar: (name: string, color: string) => Promise<void>,
    updateCar : (id:number,name:string,color:string) => Promise<void>,
    deleteCar: (id:number) => Promise<void>,
}

const BASE_URL = "http://localhost:3000";
export const useGarage: UseBoundStore<Mutate<StoreApi<Garage>, []>> = create<Garage>((set,get) => ({
    cars: [],
    isLoading: false,
    error: null,
    total: 7,
    page: 1,
    getCars: async () => {
        set({isLoading: true})
        try {
            const res = await fetch(`${BASE_URL}/garage`)
            if (!res.ok)throw new Error("Failed to fetch Garage, Try again");
            set({cars: await res.json(), error: null})
        } catch (e) {
            set({error: e instanceof Error ? e.message : 'Something went wrong'})
        } finally {
            set({isLoading: false})
        }
    },
    createCar: async (name: string, color: string) => {
        set({isLoading: true})
        try {
            const res = await fetch(`${BASE_URL}/garage`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({name, color})
            })

            if (!res.ok)throw new Error("Failed to add car in Garage, Try again");
            const newCar = await res.json()
            set({cars: [...get().cars, newCar]})
        } catch (e) {
            set({error: e instanceof Error ? e.message : 'Something went wrong'})
        }
        finally {
            set({isLoading: false})
        }
    },
    updateCar:async(id:number,name:string,color:string)=>{
        set({isLoading: true})
        try{
            const res = await fetch(`${BASE_URL}/garage/${id}`,{
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body:JSON.stringify({name, color})
            })

            if (!res.ok)throw new Error("Failed to update the car");

            const updatedCar = await res.json()
            const cars = get().cars.map(car => car.id === id ? updatedCar : car)
            set({cars,error: null})
        }catch (e) {
            set({error: e instanceof Error ? e.message : 'Something went wrong'})
        }finally {
            set({isLoading: false})
        }
    },
    deleteCar:async(id:number)=>{
        set({isLoading: true})
        try{
            const res = await fetch(`${BASE_URL}/garage/${id}`,{
                method: "DELETE",
            })

            if(!res.ok)throw new Error("Failed to delete the car");
            const updatedList = get().cars.filter(car => car.id !== id)

            set({cars: updatedList,error: null})
        }catch (e) {
            set({error: e instanceof Error ? e.message : 'Something went wrong'})

        }finally {
            set({isLoading: false})
        }
    },

}))