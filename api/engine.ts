import axios from 'axios'
import { EngineStartResponse, DriveResponse } from '../types/Engine'

export const startEngine = async (
  api_base_url: string,
  endpoint: string,
  status: string,
  id: number,
): Promise<EngineStartResponse> => {
  try {
    const response = await axios.patch<EngineStartResponse>(`${api_base_url}/${endpoint}`, null, {
      params: {
        id,
        status,
      },
    })
    return response.data
  } catch (error) {
    throw error
  }
}

export const stopEngine = async (
  api_base_url: string,
  endpoint: string,
  status: string,
  id: number,
): Promise<void> => {
  try {
    await axios.patch(`${api_base_url}/${endpoint}`, null, {
      params: {
        id,
        status,
      },
    })
  } catch (error) {
    throw error
  }
}

export const driveCar = async (
  api_base_url: string,
  endpoint: string,
  status: string,
  id: number,
): Promise<boolean> => {
  try {
    const response = await axios.patch<DriveResponse>(`${api_base_url}/${endpoint}`, null, {
      params: {
        id,
        status,
      },
    })
    return response.data.success
  } catch (error) {
    throw error
  }
}
