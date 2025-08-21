import axios from 'axios'
import type { EngineStartResponse, DriveResponse } from '../types/Engine'

export const startEngine = async (
  api_base_url: string,
  endpoint: string,
  status: string,
  id: number,
): Promise<{ id: number; data: EngineStartResponse }> => {
  try {
    const response = await axios.patch<EngineStartResponse>(`${api_base_url}/${endpoint}`, null, {
      params: {
        id,
        status,
      },
    })
    return { id, data: response.data }
  } catch (error) {
    throw error
  }
}

export const stopEngine = async (
  api_base_url: string,
  endpoint: string,
  status: string,
  id: number,
): Promise<number> => {
  try {
    await axios.patch(`${api_base_url}/${endpoint}`, null, {
      params: {
        id,
        status,
      },
    })
    return id
  } catch (error) {
    throw error
  }
}

export const driveCar = async (
  api_base_url: string,
  endpoint: string,
  status: string,
  id: number,
): Promise<number> => {
  try {
    await axios.patch<DriveResponse>(`${api_base_url}/${endpoint}`, null, {
      params: {
        id,
        status,
      },
    })
    return id
  } catch (error) {
    throw error
  }
}
