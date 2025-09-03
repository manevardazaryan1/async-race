import { api } from './api'
import type { Cars, Car } from '../types/Garage'

export const getCars = async (endpoint: string, page?: number, limit?: number): Promise<Cars> => {
  const response = await api.get<Car[]>(`/${endpoint}`, {
    params: {
      _page: page,
      _limit: limit,
    },
  })

  const totalCount = parseInt(response.headers['x-total-count']) || 0
  return {
    cars: response.data,
    totalCount: totalCount,
  }
}

export const getCar = async (endpoint: string, id: number): Promise<Car> => {
  const response = await api.get<Car>(`/${endpoint}/${id}`)
  return response.data
}

export const createCar = async (endpoint: string, name: string, color: string): Promise<Car> => {
  const response = await api.post<Car>(`/${endpoint}`, {
    name,
    color,
  })
  return response.data
}

export const deleteCar = async (endpoint: string, id: number): Promise<number> => {
  await api.delete(`/${endpoint}/${id}`)
  return id
}

export const updateCar = async (
  endpoint: string,
  id: number,
  name?: string,
  color?: string,
): Promise<Car | null> => {
  const response = await api.put<Car>(`/${endpoint}/${id}`, {
    name,
    color,
  })
  return response.data
}
