import axios from 'axios'
import type { Cars, Car } from '../types/Garage'

export const getCars = async (
  api_base_url: string,
  endpoint: string,
  page?: number,
  limit?: number,
): Promise<Cars> => {
  const response = await axios.get<Car[]>(`${api_base_url}/${endpoint}`, {
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

export const getCar = async (api_base_url: string, endpoint: string, id: number): Promise<Car> => {
  const response = await axios.get<Car>(`${api_base_url}/${endpoint}/${id}`)
  return response.data
}

export const createCar = async (
  api_base_url: string,
  endpoint: string,
  name: string,
  color: string,
): Promise<Car> => {
  const response = await axios.post<Car>(`${api_base_url}/${endpoint}`, {
    name,
    color,
  })
  return response.data
}

export const deleteCar = async (
  api_base_url: string,
  endpoint: string,
  id: number,
): Promise<number> => {
  await axios.delete(`${api_base_url}/${endpoint}/${id}`)
  return id
}

export const updateCar = async (
  api_base_url: string,
  endpoint: string,
  id: number,
  name?: string,
  color?: string,
): Promise<Car | null> => {
  const response = await axios.put<Car>(`${api_base_url}/${endpoint}/${id}`, {
    name,
    color,
  })
  return response.data
}
