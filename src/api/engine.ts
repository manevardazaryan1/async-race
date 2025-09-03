import { api } from './api'
import type { EngineStartResponse } from '../types/Engine'

export const startEngine = async (
  endpoint: string,
  status: string,
  id: number,
): Promise<{ id: number; data: EngineStartResponse }> => {
  const response = await api.patch<EngineStartResponse>(`/${endpoint}`, null, {
    params: {
      id,
      status,
    },
  })
  return { id, data: response.data }
}

export const stopEngine = async (endpoint: string, status: string, id: number): Promise<number> => {
  await api.patch(`/${endpoint}`, null, {
    params: {
      id,
      status,
    },
  })
  return id
}

export const driveCar = async (
  endpoint: string,
  status: string,
  id: number,
  signal?: AbortSignal,
): Promise<number> => {
  try {
    await api.patch(`/${endpoint}`, null, {
      params: { id, status },
      signal,
    })
    return id
  } catch {
    throw new Error(`Car ${id} crashed`)
  }
}
