import axios from 'axios'
import type { EngineStartResponse } from '../types/Engine'

export const startEngine = async (
  api_base_url: string,
  endpoint: string,
  status: string,
  id: number,
): Promise<{ id: number; data: EngineStartResponse }> => {
  const response = await axios.patch<EngineStartResponse>(`${api_base_url}/${endpoint}`, null, {
    params: {
      id,
      status,
    },
  })
  return { id, data: response.data }
}

export const stopEngine = async (
  api_base_url: string,
  endpoint: string,
  status: string,
  id: number,
): Promise<number> => {
  await axios.patch(`${api_base_url}/${endpoint}`, null, {
    params: {
      id,
      status,
    },
  })
  return id
}

export const driveCar = async (
  api_base_url: string,
  endpoint: string,
  status: string,
  id: number,
  signal?: AbortSignal,
): Promise<number> => {
  try {
    await axios.patch(`${api_base_url}/${endpoint}`, null, {
      params: { id, status },
      signal,
    })
    return id
  } catch {
    throw new Error(`Car ${id} crashed`)
  }
}
